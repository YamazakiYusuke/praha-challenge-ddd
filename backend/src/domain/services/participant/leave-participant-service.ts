import { Injectable } from "@nestjs/common";
import { GetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Transaction } from "src/domain/commands/transaction/transaction";
import { Participant } from "src/domain/entities/participant";
import { EntityError } from "src/domain/errors/entity_error";
import { ReallocateLastParticipantInPairService } from "src/domain/services/pair/reallocate-last-participant-in-pair-service";
import { ValidateTeamMemberService } from "src/domain/services/team/validate-team-member-service";
import { PairId } from "src/domain/values/id";
import { container } from "tsyringe";

export interface ILeaveParticipantService {
  execute(participant: Participant): Promise<void>;
}

export class LeaveParticipantService implements ILeaveParticipantService {
  constructor(
    private readonly getPairByIdQuery: GetPairByIdQuery = container.resolve(GetPairByIdQuery),
    private readonly savePairCommand: SavePairCommand = container.resolve(SavePairCommand),
    private readonly saveParticipantCommand: SaveParticipantCommand = container.resolve(SaveParticipantCommand),
    private readonly validateTeamMemberService: ValidateTeamMemberService = container.resolve(ValidateTeamMemberService),
    private readonly reallocateLastParticipantInPairService: ReallocateLastParticipantInPairService = container.resolve(ReallocateLastParticipantInPairService),
    private readonly transaction: Transaction = container.resolve(Transaction),
  ) { }

  async execute(participant: Participant): Promise<void> {
    const pair = await this.getPairByIdQuery.execute(participant.pairId as PairId);
    if (pair == null) {
      throw new EntityError('ペアが存在しません');
    }
    participant.changeEnrollmentStatusToOnLeave();
    pair.removeParticipant(participant.id);

    await this.transaction.execute(async (tx) => {
      await this.saveParticipantCommand.execute(participant, tx);
      await this.savePairCommand.execute(pair, tx);
    })


    await this.validateTeamMemberService.execute(pair.teamId);
    await this.reallocateLastParticipantInPairService.execute(pair);
  }
}
