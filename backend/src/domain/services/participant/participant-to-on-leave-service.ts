import { Inject, Injectable } from "@nestjs/common";
import { IGetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { ISavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { ISaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { IReallocateLastParticipantInPairService } from "src/domain/services/pair/reallocate-last-participant-in-pair-service";
import { ITeamMemberValidationService } from "src/domain/services/team/team-member-validation-service";
import { PairId } from "src/domain/values/id";

export interface IParticipantToOnLeaveService {
  execute(participant: Participant): Promise<void | Error>;
}

@Injectable()
export class ParticipantToOnLeaveService implements IParticipantToOnLeaveService {
  constructor(
    @Inject('IGetPairByIdQuery')
    private readonly getPairByIdQuery: IGetPairByIdQuery,
    @Inject('ISavePairCommand')
    private readonly savePairCommand: ISavePairCommand,
    @Inject('ISaveParticipantCommand')
    private readonly saveParticipantCommand: ISaveParticipantCommand,
    @Inject('ITeamMemberValidationService')
    private readonly teamMemberValidationService: ITeamMemberValidationService,
    @Inject('IReallocateLastParticipantInPairService')
    private readonly reallocateLastParticipantInPairService: IReallocateLastParticipantInPairService,
  ) { }

  async execute(participant: Participant): Promise<void | Error> {
    const pair = await this.getPairByIdQuery.execute(participant.pairId as PairId) as Pair;
    participant.changeEnrollmentStatusToOnLeave();
    pair.removeParticipant(participant.id);
    // TODO: トランザクションにする
    await this.saveParticipantCommand.execute(participant);
    await this.savePairCommand.execute(pair);

    await this.teamMemberValidationService.execute(pair.teamId);
    await this.reallocateLastParticipantInPairService.execute(pair);
  }
}
