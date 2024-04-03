import { GetParticipantByEmailQuery } from 'src/domain/commands/participant/get-participant-by-email-query';
import { Participant } from 'src/domain/entities/participant';
import { IParticipantRepository } from 'src/domain/repositories/participant-repository';
import { Email } from 'src/domain/values/email';
import { PairId, TeamId } from 'src/domain/values/id';
import { PersonName } from 'src/domain/values/name';
import { EnrollmentStatusValue } from 'src/util/enums';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetParticipantByEmailQuery UnitTest \n', () => {
  let query: GetParticipantByEmailQuery;
  let participantRepository: IParticipantRepository;

  beforeEach(() => {
    participantRepository = mock<IParticipantRepository>();
    query = new GetParticipantByEmailQuery(instance(participantRepository));
  });

  it('- should get participant by email \n', async () => {
    // 準備
    const email = Email.create('test@example.com');
    const participant = Participant.create({
      name: PersonName.create('Test Participant'),
      email: email,
      teamId: TeamId.create(),
      pairId: PairId.create(),
      enrollmentStatus: EnrollmentStatusValue.Enrolled
    });
    when(participantRepository.getAll()).thenResolve([participant]);

    // 実行
    const result = await query.execute(email);

    // 確認
    expect(result).toEqual(participant);
    verify(participantRepository.getAll()).once();
  });

  it('- should return null when participantRepository.getAll returns empty array \n', async () => {
    // 準備
    when(participantRepository.getAll()).thenResolve([]);

    // 実行
    const result = await query.execute(Email.create('test@example.com'));

    // 確認
    expect(result).toBeNull();
    verify(participantRepository.getAll()).once();
  });
});
