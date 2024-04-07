import { GetParticipantsByTeamIdQuery } from 'src/domain/commands/participant/get-participants-by-team-id-query';
import { Participant } from 'src/domain/entities/participant';
import { IParticipantRepository } from 'src/domain/repositories/participant-repository';
import { Email } from 'src/domain/values/email';
import { PairId, TeamId } from 'src/domain/values/ids';
import { PersonName } from 'src/domain/values/name';
import { EnrollmentStatusValue } from 'src/util/enums';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetParticipantsByTeamIdQuery UnitTest \n', () => {
  let query: GetParticipantsByTeamIdQuery;
  let participantRepository: IParticipantRepository;

  beforeEach(() => {
    participantRepository = mock<IParticipantRepository>();
    query = new GetParticipantsByTeamIdQuery(instance(participantRepository));
  });

  it('- should get participants by team id \n', async () => {
    // 準備
    const teamId = TeamId.create();
    const participant1 = Participant.create({
      name: PersonName.create('Participant 1'),
      email: Email.create('participant1@example.com'),
      teamId: teamId,
      pairId: PairId.create(),
      enrollmentStatus: EnrollmentStatusValue.Enrolled
    });
    const participant2 = Participant.create({
      name: PersonName.create('Participant 2'),
      email: Email.create('participant2@example.com'),
      teamId: teamId,
      pairId: PairId.create(),
      enrollmentStatus: EnrollmentStatusValue.Enrolled
    });
    when(participantRepository.getAll()).thenResolve([participant1, participant2]);

    // 実行
    const result = await query.execute(teamId);

    // 確認
    expect(result).toEqual([participant1, participant2]);
    verify(participantRepository.getAll()).once();
  });

  it('- should return null when participantRepository.getAll returns empty array \n', async () => {
    // 準備
    when(participantRepository.getAll()).thenResolve([]);

    // 実行
    const result = await query.execute(TeamId.create());

    // 確認
    expect(result).toEqual([]);
    verify(participantRepository.getAll()).once();
  });
});
