import { GetParticipantsByTeamIdQuery } from "src/domain/commands/participant/get-participants-by-team-id-query";
import { GetTeamByIdQuery } from "src/domain/commands/team/get-team-by-id-query";
import { Participant } from "src/domain/entities/participant";
import { Team } from "src/domain/entities/team";
import { CreateAdminEmailService } from "src/domain/services/admin_email/create-admin-email-service";
import { SendAdminEmailService } from "src/domain/services/admin_email/send-admin-email-service";
import { ValidateTeamMemberService } from "src/domain/services/team/validate-team-member-service";
import { EnrollmentStatusValue } from "src/domain/util/enums";
import { Email } from "src/domain/values/email";
import { GenerationId, ParticipantId, TeamId } from "src/domain/values/ids";
import { PersonName, TeamName } from "src/domain/values/name";
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# ValidateTeamMemberService UnitTest \n', () => {
  let validateTeamMemberService: ValidateTeamMemberService;
  let getTeamByIdQuery: GetTeamByIdQuery;
  let createAdminEmailService: CreateAdminEmailService;
  let sendAdminEmailService: SendAdminEmailService;
  let getParticipantByTeamIdQuery: GetParticipantsByTeamIdQuery;

  beforeEach(() => {
    getTeamByIdQuery = mock(GetTeamByIdQuery);
    createAdminEmailService = mock(CreateAdminEmailService);
    sendAdminEmailService = mock(SendAdminEmailService);
    getParticipantByTeamIdQuery = mock(GetParticipantsByTeamIdQuery);

    validateTeamMemberService = new ValidateTeamMemberService(
      instance(getTeamByIdQuery),
      instance(createAdminEmailService),
      instance(sendAdminEmailService),
      instance(getParticipantByTeamIdQuery),
    );
  });

  describe('## execute \n', () => {
    it('- should not send an admin email if the team has a valid number of participants \n', async () => {
      const teamId = TeamId.create();
      const team = Team.restore(teamId, {
        name: TeamName.create('Test Team'),
        participantIds: [ParticipantId.create(), ParticipantId.create(), ParticipantId.create()],
        generationId: GenerationId.restore('gen1'),
      });
      const leavingParticipant = Participant.restore(ParticipantId.create(), {
        name: PersonName.restore('John Doe'),
        email: Email.restore('john@example.com'),
        teamId: null,
        pairId: null,
        enrollmentStatus: EnrollmentStatusValue.OnLeave,
      });

      when(getTeamByIdQuery.execute(teamId)).thenResolve(team);
      when(getParticipantByTeamIdQuery.execute(teamId)).thenResolve([leavingParticipant]);

      await validateTeamMemberService.execute(teamId, leavingParticipant);

      verify(getTeamByIdQuery.execute(teamId)).once();
      verify(getParticipantByTeamIdQuery.execute(teamId)).never();
      verify(createAdminEmailService.execute(anything())).never();
      verify(sendAdminEmailService.execute(anything())).never();
    });

    it('- should send an admin email if the team does not have a valid number of participants \n', async () => {
      const teamId = TeamId.create();
      const team = Team.restore(teamId, {
        name: TeamName.create('Test Team'),
        participantIds: [ParticipantId.create(), ParticipantId.create()],
        generationId: GenerationId.restore('gen1'),
      });
      const leavingParticipant = Participant.restore(ParticipantId.create(), {
        name: PersonName.restore('John Doe'),
        email: Email.restore('john@example.com'),
        teamId: null,
        pairId: null,
        enrollmentStatus: EnrollmentStatusValue.OnLeave,
      });

      when(getTeamByIdQuery.execute(teamId)).thenResolve(team);
      when(getParticipantByTeamIdQuery.execute(teamId)).thenResolve([]);

      await validateTeamMemberService.execute(teamId, leavingParticipant);

      verify(getTeamByIdQuery.execute(teamId)).once();
      verify(getParticipantByTeamIdQuery.execute(teamId)).once();
      verify(createAdminEmailService.execute(anything())).once();
      verify(sendAdminEmailService.execute(anything())).once();
    });
  });
});
