import { Inject, Injectable } from "@nestjs/common";
import { IGetPairWithFewestMembersByTeamIdQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-by-team-id-query";
import { ISavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { IGetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { ISaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { ServiceError } from "src/domain/errors/service_error";
import { ITransactionRepository } from "src/domain/repositories/transaction-repository";
import { ICreatePairService } from "src/domain/services/pair/create-pair-service";

export interface IReallocateLastParticipantInPairService {
  execute(pair: Pair): Promise<void | Error>;
}

@Injectable()
export class ReallocateLastParticipantInPairService implements IReallocateLastParticipantInPairService {
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
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) { }

  async execute(pair: Pair): Promise<void | Error> {
    if (!pair.hasInsufficientMinParticipants) return;

    const lastParticipantId = pair.lastParticipant;
    const lastParticipant = await this.getParticipantByIdQuery.execute(lastParticipantId) as Participant;
    const fewestPair = await this.getPairWithFewestMembersByTeamIdQuery.execute(pair.teamId, pair.id) as Pair;
    if (!fewestPair.hasValidNumberOfParticipants) {
      // TODO: 合流可能なペアがない為管理者にメール  メール文に「どの参加者が減ったのか」「どの参加者が合流先を探しているのか」を記載
      throw new ServiceError('合流可能なペアーがありません');
    }
    if (fewestPair.participantsLength == Pair.maxNumber) {
      const moverId = fewestPair.lastParticipant;
      const mover = await this.getParticipantByIdQuery.execute(moverId) as Participant;

      fewestPair.removeParticipant(moverId);
      const newPair = await this.createPairService.execute({ teamId: fewestPair.teamId, participantIds: [lastParticipantId, moverId] }) as Pair;
      lastParticipant.changeTeamIdPairId(newPair.id, newPair.teamId);
      mover.changeTeamIdPairId(newPair.id, newPair.teamId);

      await this.transactionRepository.execute(async (tx) => {
        await this.saveParticipantCommand.execute(lastParticipant, tx);
        await this.saveParticipantCommand.execute(mover, tx);
        await this.savePairCommand.execute(fewestPair, tx);
        await this.savePairCommand.execute(newPair, tx);
      })

    } else {
      fewestPair.appendParticipant(lastParticipantId);
      lastParticipant.changeTeamIdPairId(fewestPair.id, fewestPair.teamId);

      await this.transactionRepository.execute(async (tx) => {
        await this.saveParticipantCommand.execute(lastParticipant, tx);
        await this.savePairCommand.execute(fewestPair, tx);
      })
    }
  }
}