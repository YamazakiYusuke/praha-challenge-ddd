import { GetParticipantByIdQuery } from 'src/domain/commands/participant/get-participant-by-id-query';
import { Participant } from 'src/domain/entities/participant';
import { IParticipantRepository } from 'src/domain/repositories/participant-repository';
import { EnrollmentStatusValue } from 'src/domain/util/enums';
import { Email } from 'src/domain/values/email';
import { PairId, ParticipantId, TeamId } from 'src/domain/values/ids';
import { PersonName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetParticipantByIdQuery UnitTest \n', () => {
  let query: GetParticipantByIdQuery;
  let participantRepository: IParticipantRepository;

  beforeEach(() => {
    participantRepository = mock<IParticipantRepository>();
    query = new GetParticipantByIdQuery(instance(participantRepository));
  });

  it('- should get participant by id \n', async () => {
    // 準備
    const id = ParticipantId.create();
    const participant = Participant.restore(id, {
      name: PersonName.create('Test Participant'),
      email: Email.create('test@example.com'),
      teamId: TeamId.create(),
      pairId: PairId.create(),
      enrollmentStatus: EnrollmentStatusValue.Enrolled
    });
    when(participantRepository.getAll()).thenResolve([participant]);

    // 実行
    const result = await query.execute(id);

    // 確認
    expect(result).toEqual(participant);
    verify(participantRepository.getAll()).once();
  });

  it('- should return null when participantRepository.getAll returns null \n', async () => {
    // 準備
    when(participantRepository.getAll()).thenResolve([]);

    // 実行
    const result = await query.execute(ParticipantId.create());

    // 確認
    expect(result).toBeNull();
    verify(participantRepository.getAll()).once();
  });
});
