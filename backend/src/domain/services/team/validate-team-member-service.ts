import { GetParticipantByTeamIdQuery } from "src/domain/commands/participant/get-participant-by-team-id-query";
import { GetTeamByIdQuery } from "src/domain/commands/team/get-team-by-id-query";
import { Participant } from "src/domain/entities/participant";
import { Team } from "src/domain/entities/team";
import { CreateAdminEmailService } from "src/domain/services/admin_email/create-admin-email-service";
import { SendAdminEmailService } from "src/domain/services/admin_email/send-admin-email-service";
import { AdminEmailContent } from "src/domain/values/admin-email-content";
import { TeamId } from "src/domain/values/id";
import { container } from "tsyringe";

export class ValidateTeamMemberService {
  constructor(
    private readonly getTeamByIdQuery: GetTeamByIdQuery = container.resolve(GetTeamByIdQuery),
    private readonly createAdminEmailService: CreateAdminEmailService = container.resolve(CreateAdminEmailService),
    private readonly sendAdminEmailService: SendAdminEmailService = container.resolve(SendAdminEmailService),
    private readonly getParticipantByTeamIdQuery: GetParticipantByTeamIdQuery = container.resolve(GetParticipantByTeamIdQuery),
  ) { }

  async execute(teamId: TeamId, leavingParticipant: Participant): Promise<void> {
    const team = await this.getTeamByIdQuery.execute(teamId) as Team;
    if (team.hasValidNumberOfParticipants) {
      const remainingParticipants = await this.getParticipantByTeamIdQuery.execute(teamId) ?? [];
      const mail = await this.createAdminEmailService.execute(AdminEmailContent.teamMemberAlert(leavingParticipant, remainingParticipants));
      await this.sendAdminEmailService.execute(mail);
    }
  }
}