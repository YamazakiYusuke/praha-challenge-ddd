import { GetPairsByTeamIdQuery } from "src/domain/commands/pair/get-pairs-by-team-id-query copy";
import { Participant } from "src/domain/entities/participant";
import { Participants } from "src/domain/entities/participants";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { Email } from "src/domain/values/email";
import { PairId, ParticipantId, ParticipantsId, TeamId } from "src/domain/values/id";
import { PersonName } from "src/domain/values/name";
import { EnrollmentStatusValue } from "src/util/enums";
import { instance, mock, verify, when } from 'ts-mockito';

describe('# CreatePairService UnitTest\n', () => {
  let getPairsByTeamIdQuery: GetPairsByTeamIdQuery;
  let createPairService: CreatePairService;
  const teamId = TeamId.restore('teamId');
  const participantsId = ParticipantsId.restore('participantsId');
  const participant = Participant.restore(ParticipantId.restore('participantId'), {
    name: PersonName.restore('John Doe'),
    email: Email.restore('john.doe@example.com'),
    teamId: TeamId.restore('teamId'),
    pairId: PairId.restore('pairId'),
    enrollmentStatus: EnrollmentStatusValue.Enrolled
  });
  const participants = Participants.restore(participantsId, [
    participant,
  ]);

  beforeEach(() => {
    getPairsByTeamIdQuery = mock(GetPairsByTeamIdQuery);
    createPairService = new CreatePairService(instance(getPairsByTeamIdQuery));
  });

  describe('## execute\n', () => {
    test('- should create a new pair\n', async () => {
      // 準備
      when(getPairsByTeamIdQuery.execute(teamId)).thenResolve([]);
      // 実行
      const result = await createPairService.execute({ teamId, participants });
      // 確認
      verify(getPairsByTeamIdQuery.execute(teamId)).once();
      expect(result).toEqual(expect.objectContaining({
        _id: expect.anything(),
        props: {
          teamId: expect.objectContaining({
            props: 'teamId'
          }),
          name: expect.objectContaining({
            props: 'a'
          }),
          participants: expect.objectContaining({
            _id: expect.objectContaining({
              props: 'participantsId'
            }),
            props: expect.arrayContaining([
              participant
            ])
          })
        }
      }));
    });
  });
});

