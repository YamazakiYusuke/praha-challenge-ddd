import { GetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Transaction } from "src/domain/commands/transaction/transaction";
import { Participant } from "src/domain/entities/participant";
import { EntityError } from "src/domain/errors/entity_error";
import { ReallocateLastParticipantInPairService } from "src/domain/services/pair/reallocate-last-participant-in-pair-service";
import { ValidateTeamMemberService } from "src/domain/services/team/validate-team-member-service";
import { PairId } from "src/domain/values/id";
import { inject, injectable } from "tsyringe";

@injectable()
export class LeaveParticipantService {
  constructor(
    @inject(GetPairByIdQuery) private readonly getPairByIdQuery: GetPairByIdQuery,
    @inject(SavePairCommand) private readonly savePairCommand: SavePairCommand,
    @inject(SaveParticipantCommand) private readonly saveParticipantCommand: SaveParticipantCommand,
    @inject(ValidateTeamMemberService) private readonly validateTeamMemberService: ValidateTeamMemberService,
    @inject(ReallocateLastParticipantInPairService) private readonly reallocateLastParticipantInPairService: ReallocateLastParticipantInPairService,
    @inject(Transaction) private readonly transaction: Transaction,
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


    await this.validateTeamMemberService.execute(pair.teamId, participant);
    await this.reallocateLastParticipantInPairService.execute(pair, participant);
  }
}
