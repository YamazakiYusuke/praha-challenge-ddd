import { GetPairWithFewestMembersByTeamIdQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-by-team-id-query";
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
export class ReallocateLastParticipantInPairService {
  constructor(
    @inject(GetParticipantByIdQuery)
    private readonly getParticipantByIdQuery: GetParticipantByIdQuery,
    @inject(CreatePairService)
    private readonly createPairService: CreatePairService,
    @inject(GetPairWithFewestMembersByTeamIdQuery)
    private readonly getPairWithFewestMembersByTeamIdQuery: GetPairWithFewestMembersByTeamIdQuery,
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

  async execute(pair: Pair, leavingParticipant: Participant): Promise<void> {
    if (!pair.hasInsufficientMinParticipants) return;

    const lastParticipantId = pair.lastParticipant;
    const lastParticipant = await this.getParticipantByIdQuery.execute(lastParticipantId) as Participant;
    const fewestPair = await this.getPairWithFewestMembersByTeamIdQuery.execute(pair.teamId, pair.id) as Pair;
    if (!fewestPair.hasValidNumberOfParticipants) {
      const mail = await this.createAdminEmailService.execute(AdminEmailContent.relocate(leavingParticipant, lastParticipant));
      await this.sendAdminEmailService.execute(mail);
      throw new DomainServiceError('合流可能なペアーがありません');
    }
    if (fewestPair.participantsLength == Pair.maxNumber) {

      const moverId = fewestPair.lastParticipant;
      const mover = await this.getParticipantByIdQuery.execute(moverId) as Participant;

      fewestPair.removeParticipant(moverId);
      const newPair = await this.createPairService.execute({ teamId: fewestPair.teamId, participantIds: [lastParticipantId, moverId] }) as Pair;
      lastParticipant.changeTeamIdPairId(newPair.id, newPair.teamId);
      mover.changeTeamIdPairId(newPair.id, newPair.teamId);

      await this.transaction.execute(async (tx) => {
        await this.saveParticipantCommand.execute(lastParticipant, tx);
        await this.saveParticipantCommand.execute(mover, tx);
        await this.savePairCommand.execute(newPair, tx);
      })

    } else {
      fewestPair.appendParticipant(lastParticipantId);
      lastParticipant.changeTeamIdPairId(fewestPair.id, fewestPair.teamId);

      await this.saveParticipantCommand.execute(lastParticipant);
    }
  }
}