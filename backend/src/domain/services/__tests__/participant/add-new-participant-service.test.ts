import { GetParticipantByEmailQuery } from "src/domain/commands/participant/get-participant-by-email-query";
import { Participant, ParticipantProps } from "src/domain/entities/participant";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { AddNewParticipantService } from "src/domain/services/participant/add-new-participant-service";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { EnrollmentStatusValue } from "src/domain/util/enums";
import { Email } from "src/domain/values/email";
import { PairId, ParticipantId, TeamId } from "src/domain/values/ids";
import { PersonName } from "src/domain/values/name";
import { anything, instance, mock, verify, when } from 'ts-mockito';
describe('# AddNewParticipantService UnitTest\n', () => {
  let enrollParticipantService: EnrollParticipantService;
  let getParticipantByEmailQuery: GetParticipantByEmailQuery;
  let addNewParticipantService: AddNewParticipantService;

  const participantProps: ParticipantProps = {
    name: PersonName.restore('Participant Name'),
    email: Email.create('participant@example.com'),
    teamId: TeamId.create(),
    pairId: PairId.create(),
    enrollmentStatus: EnrollmentStatusValue.OnLeave,
  };

  function participant(participantId: ParticipantId): Participant {
    return Participant.restore(participantId, participantProps);
  }

  beforeEach(() => {
    enrollParticipantService = mock(EnrollParticipantService);
    getParticipantByEmailQuery = mock(GetParticipantByEmailQuery);
    addNewParticipantService = new AddNewParticipantService(
      instance(enrollParticipantService),
      instance(getParticipantByEmailQuery)
    );
  });

  describe('## execute\n', () => {
    test('- when participant email is already registered\n', async () => {
      // 準備
      const newParticipant = participant(ParticipantId.create());
      when(getParticipantByEmailQuery.execute(newParticipant.email)).thenResolve(newParticipant);
      // 実装
      await expect(addNewParticipantService.execute(newParticipant)).rejects.toThrow(DomainServiceError);
      // 確認
      verify(getParticipantByEmailQuery.execute(newParticipant.email)).once();
      verify(enrollParticipantService.execute(anything())).never();
    });

    test('- when participant email is not registered\n', async () => {
      // 準備
      const newParticipant = participant(ParticipantId.create());
      when(getParticipantByEmailQuery.execute(newParticipant.email)).thenResolve(null);
      // 実行
      await addNewParticipantService.execute(newParticipant);
      // 確認
      verify(getParticipantByEmailQuery.execute(newParticipant.email)).once();
      verify(enrollParticipantService.execute(newParticipant)).once();
    });
  });
});
