import { GetParticipantByTeamIdQuery } from "src/domain/commands/participant/get-participant-by-team-id-query";
import { GetTeamByIdQuery } from "src/domain/commands/team/get-team-by-id-query";
import { Participant } from "src/domain/entities/participant";
import { Team } from "src/domain/entities/team";
import { CreateAdminEmailService } from "src/domain/services/admin_email/create-admin-email-service";
import { SendAdminEmailService } from "src/domain/services/admin_email/send-admin-email-service";
import { AdminEmailContent } from "src/domain/values/admin-email-content";
import { TeamId } from "src/domain/values/id";
import { inject, injectable } from "tsyringe";

@injectable()
export class ValidateTeamMemberService {
  constructor(
    @inject(GetTeamByIdQuery)
    private readonly getTeamByIdQuery: GetTeamByIdQuery,
    @inject(CreateAdminEmailService)
    private readonly createAdminEmailService: CreateAdminEmailService,
    @inject(SendAdminEmailService)
    private readonly sendAdminEmailService: SendAdminEmailService,
    @inject(GetParticipantByTeamIdQuery)
    private readonly getParticipantByTeamIdQuery: GetParticipantByTeamIdQuery,
  ) { }

  async execute(teamId: TeamId, leavingParticipant: Participant): Promise<void> {
    const team = await this.getTeamByIdQuery.execute(teamId) as Team;
    if (team.hasInsufficientMinParticipants) {
      const remainingParticipants = await this.getParticipantByTeamIdQuery.execute(teamId) ?? [];
      const mail = await this.createAdminEmailService.execute(AdminEmailContent.teamMemberAlert(leavingParticipant, remainingParticipants));
      await this.sendAdminEmailService.execute(mail);
    }
  }
}