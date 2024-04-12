import { GetAllParticipantsQuery } from 'src/domain/commands/participant/get-all-participants-query';
import { Participant } from 'src/domain/entities/participant';
import { IParticipantRepository } from 'src/domain/repositories/participant-repository';
import { EnrollmentStatusValue } from 'src/domain/util/enums';
import { Email } from 'src/domain/values/email';
import { PairId, TeamId } from 'src/domain/values/ids';
import { PersonName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetAllParticipantsQuery UnitTest \n', () => {
  let query: GetAllParticipantsQuery;
  let participantRepository: IParticipantRepository;

  beforeEach(() => {
    participantRepository = mock<IParticipantRepository>();
    query = new GetAllParticipantsQuery(instance(participantRepository));
  });

  it('- should get all participants \n', async () => {
    // 準備
    const participant1 = Participant.create({
      name: PersonName.create('Participant 1'),
      email: Email.create('participant1@example.com'),
      teamId: TeamId.create(),
      pairId: PairId.create(),
      enrollmentStatus: EnrollmentStatusValue.Enrolled
    });
    const participant2 = Participant.create({
      name: PersonName.create('Participant 2'),
      email: Email.create('participant2@example.com'),
      teamId: TeamId.create(),
      pairId: PairId.create(),
      enrollmentStatus: EnrollmentStatusValue.Enrolled
    });
    when(participantRepository.getAll()).thenResolve([participant1, participant2]);

    // 実行
    const result = await query.execute();

    // 確認
    expect(result).toEqual([participant1, participant2]);
    verify(participantRepository.getAll()).once();
  });

  it('- should get empty array when participantRepository.getAll returns empty array \n', async () => {
    // 準備
    when(participantRepository.getAll()).thenResolve([]);

    // 実行
    const result = await query.execute();

    // 確認
    expect(result).toEqual([]);
    verify(participantRepository.getAll()).once();
  });
});
