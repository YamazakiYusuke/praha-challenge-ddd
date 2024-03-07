import { GetPairsByTeamIdQuery } from "src/domain/commands/pair/get-pairs-by-team-id-query";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { ParticipantId, ParticipantsId, TeamId } from "src/domain/values/id";
import { instance, mock, verify, when } from 'ts-mockito';

describe('# CreatePairService UnitTest\n', () => {
  let getPairsByTeamIdQuery: GetPairsByTeamIdQuery;
  let createPairService: CreatePairService;
  const teamId = TeamId.restore('teamId');
  const participantIds = [ParticipantId.restore('participantId1'), ParticipantId.restore('participantId2')];

  beforeEach(() => {
    getPairsByTeamIdQuery = mock(GetPairsByTeamIdQuery);
    createPairService = new CreatePairService(instance(getPairsByTeamIdQuery));
  });

  describe('## execute\n', () => {
    test('- should create a new pair\n', async () => {
      // 準備
      when(getPairsByTeamIdQuery.execute(teamId)).thenResolve([]);
      // 実行
      const result = await createPairService.execute({ teamId, participantIds });
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
          participantIds: [
            { props: 'participantId1' },
            { props: 'participantId2' }
          ]
        }
      }));
    });
  });
});

