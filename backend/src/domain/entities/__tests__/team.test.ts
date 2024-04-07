import { GenerationId, ParticipantId, TeamId } from "src/domain/values/ids";
import { TeamName } from "src/domain/values/name";
import { Team, TeamProps } from "../team";

describe('# Team Entity UnitTest\n', () => {
  const participantIds = [ParticipantId.create(), ParticipantId.create()];
  const generationId = GenerationId.restore('generation1')
  const teamProps: TeamProps = {
    name: TeamName.create('Test Team'),
    participantIds: participantIds,
    generationId: generationId,
  };

  describe('## create\n', () => {
    test('- Success create instance \n', () => {
      // 準備・実行
      const team = Team.create(teamProps);
      // 確認
      expect(team).toBeInstanceOf(Team);
      expect(team.name).toEqual(teamProps.name);
      expect(team.participantIds).toEqual(participantIds);
      expect(team.generationId).toEqual(generationId);
    });
  });

  describe('## restore\n', () => {
    test('- Success restore instance \n', () => {
      // 準備
      const id = TeamId.create();
      // 実行
      const team = Team.restore(id, teamProps);
      // 確認
      expect(team).toBeInstanceOf(Team);
      expect(team.id).toEqual(id);
      expect(team.name).toEqual(teamProps.name);
      expect(team.participantIds).toEqual(participantIds);
      expect(team.generationId).toEqual(generationId);
    });
  });

  describe('## hasValidNumberOfParticipants\n', () => {
    test('- Valid number of participants \n', () => {
      // 準備・実行
      const team = Team.create(teamProps);
      // 確認
      expect(team.hasValidNumberOfParticipants).toEqual(true);
    });

    test('- Insufficient number of participants \n', () => {
      // 準備
      const insufficientProps = { ...teamProps, participantIds: [ParticipantId.create()] };
      // 実行
      const team = Team.create(insufficientProps);
      // 確認
      expect(team.hasInsufficientMinParticipants).toEqual(true);
    });
  });
});
