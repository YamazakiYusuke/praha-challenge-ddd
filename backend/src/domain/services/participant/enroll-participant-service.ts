import { Prisma } from '@prisma/client';
import { GetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { GetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Transaction } from "src/domain/commands/transaction/transaction";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { CreateAdminEmailService } from "src/domain/services/admin_email/create-admin-email-service";
import { SendAdminEmailService } from "src/domain/services/admin_email/send-admin-email-service";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { AdminEmailContent } from "src/domain/values/admin-email-content";
import { inject, injectable } from "tsyringe";

@injectable()
export class EnrollParticipantService {
  constructor(
    @inject(GetPairWithFewestMembersQuery)
    private readonly getPairWithFewestMembersQuery: GetPairWithFewestMembersQuery,
    @inject(CreatePairService)
    private readonly createPairService: CreatePairService,
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
    @inject(GetParticipantByIdQuery)
    private readonly getParticipantByIdQuery: GetParticipantByIdQuery,
  ) { }

  async execute(participant: Participant): Promise<void> {
    const smallestPair = await this.getPairWithFewestMembersQuery.execute();
    if (smallestPair == null) {
      const mail = await this.createAdminEmailService.execute(AdminEmailContent.join(participant));
      await this.sendAdminEmailService.execute(mail);
      throw new DomainServiceError('参加可能なペアがありません');
    }
    if (smallestPair.participantsLength == Pair.maxNumber) {
      const moverId = smallestPair.lastParticipant;
      const mover = await this.getParticipantByIdQuery.execute(moverId) as Participant;

      smallestPair.removeParticipant(moverId);
      const newPair = await this.createPairService.execute({ teamId: smallestPair.teamId, participantIds: [participant.id, moverId] });
      participant.changeTeamIdPairId(newPair.id, newPair.teamId);
      mover.changeTeamIdPairId(newPair.id, newPair.teamId);
      await this.transaction.execute(async (tx) => {
        // pairが正常に作成されていない。
        await this.savePairCommand.execute(newPair, tx);
        await this.saveParticipantCommand.execute(participant, tx);
        await this.saveParticipantCommand.execute(mover, tx);
      })
    } else {
      participant.changeEnrollmentStatusToEnrolled(smallestPair.teamId, smallestPair.id);
      smallestPair.appendParticipant(participant.id);
      await this.saveParticipantCommand.execute(participant);
    }
  }
}