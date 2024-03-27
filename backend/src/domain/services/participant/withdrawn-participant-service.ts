import { GetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Transaction } from "src/domain/commands/transaction/transaction";
import { Participant } from "src/domain/entities/participant";
import { EntityError } from "src/domain/errors/entity_error";
import { ReallocateLastParticipantInPairService } from "src/domain/services/pair/reallocate-last-participant-in-pair-service";
import { ValidateTeamMemberService } from "src/domain/services/team/validate-team-member-service";
import { PairId } from "src/domain/values/id";

export class WithdrawnParticipantService {
  constructor(
    private readonly getPairByIdQuery: GetPairByIdQuery,
    private readonly savePairCommand: SavePairCommand,
    private readonly saveParticipantCommand: SaveParticipantCommand,
    private readonly validateTeamMemberService: ValidateTeamMemberService,
    private readonly reallocateLastParticipantInPairService: ReallocateLastParticipantInPairService,
    private readonly transaction: Transaction,
  ) { }

  async execute(participant: Participant): Promise<void> {
    const pair = await this.getPairByIdQuery.execute(participant.pairId as PairId);
    if (pair == null) {
      throw new EntityError('ペアが存在しません');
    }
    participant.changeEnrollmentStatusToWithDrawn();
    pair.removeParticipant(participant.id);

    await this.transaction.execute(async (tx) => {
      await this.saveParticipantCommand.execute(participant, tx);
      await this.savePairCommand.execute(pair, tx);
    })

    await this.validateTeamMemberService.execute(pair.teamId, participant);
    await this.reallocateLastParticipantInPairService.execute(pair, participant);
  }
}
