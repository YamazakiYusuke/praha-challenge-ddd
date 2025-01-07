import { GetPairsByTeamIdQuery } from "src/domain/commands/pair/get-pairs-by-team-id-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { ParticipantId, TeamId } from "src/domain/values/ids";
import { anything, instance, mock, verify, when } from 'ts-mockito';

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
        _props: {
          teamId: expect.objectContaining({
            _props: 'teamId'
          }),
          name: expect.objectContaining({
            _props: 'a'
          }),
          participantIds: [
            { _props: 'participantId1' },
            { _props: 'participantId2' }
          ]
        }
      }));
    });
  });
});


