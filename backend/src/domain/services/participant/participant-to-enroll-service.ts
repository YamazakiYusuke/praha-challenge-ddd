import { Inject, Injectable } from "@nestjs/common";
import { IGetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { ISavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { ISaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { EntityError } from "src/domain/errors/entity_error";

export interface IParticipantToEnrollService {
  execute(participant: Participant): Promise<void | Error>;
}

@Injectable()
export class ParticipantToEnrollService implements IParticipantToEnrollService {
  constructor(
    @Inject('IGetPairWithFewestMembersQuery')
    private readonly getPairWithFewestMembersQuery: IGetPairWithFewestMembersQuery,
    @Inject('ISavePairCommand')
    private readonly savePairCommand: ISavePairCommand,
    @Inject('ISaveParticipantCommand')
    private readonly saveParticipantCommand: ISaveParticipantCommand,
  ) { }

  async execute(participant: Participant): Promise<void | Error> {
    const smallestPair = await this.getPairWithFewestMembersQuery.execute() as Pair | null;
    if (smallestPair == null) {
      // TODO: 管理者にメール
      throw new EntityError('参加可能なペアがありません');
    }
    participant.changeEnrollmentStatusToEnrolled(smallestPair.teamId, smallestPair.id);
    smallestPair.appendParticipant(participant.id);
    // TODO: トランザクションにする
    await this.saveParticipantCommand.execute(participant);
    await this.savePairCommand.execute(smallestPair);
  }
}