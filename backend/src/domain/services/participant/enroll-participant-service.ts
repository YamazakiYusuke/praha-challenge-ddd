import { Injectable } from "@nestjs/common";
import { GetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Transaction } from "src/domain/commands/transaction/transaction";
import { Participant } from "src/domain/entities/participant";
import { EntityError } from "src/domain/errors/entity_error";
import { container } from "tsyringe";

export interface IEnrollParticipantService {
  execute(participant: Participant): Promise<void>;
}

export class EnrollParticipantService implements IEnrollParticipantService {
  constructor(
    private readonly getPairWithFewestMembersQuery: GetPairWithFewestMembersQuery = container.resolve(GetPairWithFewestMembersQuery),
    private readonly savePairCommand: SavePairCommand = container.resolve(SavePairCommand),
    private readonly saveParticipantCommand: SaveParticipantCommand = container.resolve(SaveParticipantCommand),
    private readonly transaction: Transaction = container.resolve(Transaction),
  ) { }

  async execute(participant: Participant): Promise<void> {
    const smallestPair = await this.getPairWithFewestMembersQuery.execute();
    if (smallestPair == null) {
      // TODO: 管理者にメール
      throw new EntityError('参加可能なペアがありません');
    }
    participant.changeEnrollmentStatusToEnrolled(smallestPair.teamId, smallestPair.id);
    smallestPair.appendParticipant(participant.id);

    await this.transaction.execute(async (tx) => {
      await this.saveParticipantCommand.execute(participant, tx);
      await this.savePairCommand.execute(smallestPair, tx);
    })

  }
}