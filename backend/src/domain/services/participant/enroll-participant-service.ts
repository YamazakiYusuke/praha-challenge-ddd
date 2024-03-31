import { GetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Transaction } from "src/domain/commands/transaction/transaction";
import { Participant } from "src/domain/entities/participant";
import { EntityError } from "src/domain/errors/entity_error";
import { CreateAdminEmailService } from "src/domain/services/admin_email/create-admin-email-service";
import { SendAdminEmailService } from "src/domain/services/admin_email/send-admin-email-service";
import { AdminEmailContent } from "src/domain/values/admin-email-content";
import { inject, injectable } from "tsyringe";

@injectable()
export class EnrollParticipantService {
  constructor(
    @inject(GetPairWithFewestMembersQuery)
    private readonly getPairWithFewestMembersQuery: GetPairWithFewestMembersQuery,
    @inject(SavePairCommand)
    private readonly savePairCommand: SavePairCommand,
    @inject(SaveParticipantCommand)
    private readonly saveParticipantCommand: SaveParticipantCommand,
    @inject(Transaction)
    private readonly transaction: Transaction,
    @inject(CreateAdminEmailService)
    private readonly createAdminEmailService: CreateAdminEmailService,
    @inject(SendAdminEmailService)
    private readonly sendAdminEmailService: SendAdminEmailService,
  ) { }

  async execute(participant: Participant): Promise<void> {
    const smallestPair = await this.getPairWithFewestMembersQuery.execute();
    if (smallestPair == null) {
      const mail = await this.createAdminEmailService.execute(AdminEmailContent.join(participant));
      await this.sendAdminEmailService.execute(mail);
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