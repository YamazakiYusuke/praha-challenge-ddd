import { Inject, Injectable } from "@nestjs/common";
import { IGetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { ISavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { ISaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Participant } from "src/domain/entities/participant";
import { EntityError } from "src/domain/errors/entity_error";
import { ITransactionRepository } from "src/domain/repositories/transaction-repository";
import { IReallocateLastParticipantInPairService } from "src/domain/services/pair/reallocate-last-participant-in-pair-service";
import { ITeamMemberValidationService } from "src/domain/services/team/team-member-validation-service";
import { PairId } from "src/domain/values/id";

export interface IWithdrawnParticipantService {
  execute(participant: Participant): Promise<void>;
}

@Injectable()
export class WithdrawnParticipantService implements IWithdrawnParticipantService {
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
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) { }

  async execute(participant: Participant): Promise<void> {
    const pair = await this.getPairByIdQuery.execute(participant.pairId as PairId);
    if (pair == null) {
      throw new EntityError('ペアが存在しません');
    }
    participant.changeEnrollmentStatusToWithDrawn();
    pair.removeParticipant(participant.id);

    await this.transactionRepository.execute(async (tx) => {
      await this.saveParticipantCommand.execute(participant, tx);
      await this.savePairCommand.execute(pair, tx);
    })

    await this.teamMemberValidationService.execute(pair.teamId);
    await this.reallocateLastParticipantInPairService.execute(pair);
  }
}
