import { Inject, Injectable } from "@nestjs/common";
import { IGetPairWithFewestMembersByTeamIdQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-by-team-id-query";
import { ISavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { IGetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { ISaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { ICreatePairService } from "src/domain/services/pair/create-pair-service";

export interface IPairParticipantAdjustmentService {
  execute(pair: Pair): Promise<void | Error>;
}

@Injectable()
export class PairParticipantAdjustmentService implements IPairParticipantAdjustmentService {
  constructor(
    @Inject('IGetParticipantByIdQuery')
    private readonly getParticipantByIdQuery: IGetParticipantByIdQuery,
    @Inject('ICreatePairService')
    private readonly createPairService: ICreatePairService,
    @Inject('IGetPairWithFewestMembersByTeamIdQuery')
    private readonly getPairWithFewestMembersByTeamIdQuery: IGetPairWithFewestMembersByTeamIdQuery,
    @Inject('ISavePairCommand')
    private readonly savePairCommand: ISavePairCommand,
    @Inject('ISaveParticipantCommand')
    private readonly saveParticipantCommand: ISaveParticipantCommand,
  ) { }

  async execute(pair: Pair): Promise<void | Error> {
    if (pair.hasExceededMaxParticipants) {
      await this.adjustPairCaseHasExceededMaxParticipants(pair);
    } else if (pair.hasInsufficientMinParticipants) {
      await this.adjustPairCaseHasInsufficientMinParticipants(pair);
    }
  }

  private async adjustPairCaseHasExceededMaxParticipants(pair: Pair): Promise<void> {
    const moverId1 = pair.lastParticipant;
    const moverId2 = pair.lastParticipant;
    const mover1 = await this.getParticipantByIdQuery.execute(moverId1) as Participant;
    const mover2 = await this.getParticipantByIdQuery.execute(moverId2) as Participant;

    pair.removeParticipant(moverId1);
    pair.removeParticipant(moverId2);
    const newPair = await this.createPairService.execute({ teamId: pair.teamId, participantIds: [moverId1, moverId2] }) as Pair;
    mover1.changeTeamIdPairId(newPair.id, newPair.teamId);
    mover2.changeTeamIdPairId(newPair.id, newPair.teamId);

    // TODO: トランザクションにする
    await this.saveParticipantCommand.execute(mover1);
    await this.saveParticipantCommand.execute(mover2);
    await this.savePairCommand.execute(pair);
    await this.savePairCommand.execute(newPair);
  }

  private async adjustPairCaseHasInsufficientMinParticipants(pair: Pair): Promise<void> {
    const lastParticipantId = pair.lastParticipant;
    const lastParticipant = await this.getParticipantByIdQuery.execute(lastParticipantId) as Participant;
    const fewestPair = await this.getPairWithFewestMembersByTeamIdQuery.execute(pair.teamId, pair.id) as Pair;
    if (fewestPair.participantsLength == 3) {
      const moverId = fewestPair.lastParticipant;
      const mover = await this.getParticipantByIdQuery.execute(moverId) as Participant;

      fewestPair.removeParticipant(moverId);
      const newPair = await this.createPairService.execute({ teamId: fewestPair.teamId, participantIds: [lastParticipantId, moverId] }) as Pair;
      lastParticipant.changeTeamIdPairId(newPair.id, newPair.teamId);
      mover.changeTeamIdPairId(newPair.id, newPair.teamId);

      // TODO: トランザクションにする
      await this.saveParticipantCommand.execute(lastParticipant);
      await this.saveParticipantCommand.execute(mover);
      await this.savePairCommand.execute(fewestPair);
      await this.savePairCommand.execute(newPair);
    } else {
      fewestPair.appendParticipant(lastParticipantId);
      lastParticipant.changeTeamIdPairId(fewestPair.id, fewestPair.teamId);

      // TODO: トランザクションにする
      await this.saveParticipantCommand.execute(lastParticipant);
      await this.savePairCommand.execute(fewestPair);
    }
  }
}