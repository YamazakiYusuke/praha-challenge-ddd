import { Pair } from "src/domain/entities/pair";
import { PairId, ParticipantId, TeamId } from "src/domain/values/id";
import { PairName } from "src/domain/values/name";

describe('# Pair Entity UnitTest\n', () => {
  const participantId1 = ParticipantId.restore('participantId1');
  const participantId2 = ParticipantId.restore('participantId2');
  const participantId3 = ParticipantId.restore('participantId3');

  const pairInstance = () => Pair.restore(
    PairId.restore('PairId'),
    {
      teamId: TeamId.restore('teamId'),
      name: PairName.restore('PairName'),
      participantIds: [participantId1, participantId2],
    },
  );

  describe('## Factory\n', () => {
    describe('### create\n', () => {
      test('- Success create instance \n', () => {
        // 準備・実行
        const pair = Pair.create(
          {
            teamId: TeamId.restore('teamId'),
            name: PairName.restore('PairName'),
            participantIds: [participantId1, participantId2],
          },
        ) as Pair;
        // 確認
        expect(pair).toBeInstanceOf(Pair);
        expect(pair.teamId).toEqual(TeamId.restore('teamId'));
        expect(pair.name).toEqual(PairName.restore('PairName'));
        expect(pair.participantIds).toHaveLength(2);
        expect(pair.participantIds[0]).toEqual(participantId1);
        expect(pair.participantIds[1]).toEqual(participantId2);
      });
    });

    describe('### restore\n', () => {
      test('- Success restore instance \n', () => {
        // 準備・実行
        const pair = Pair.restore(
          PairId.restore('PairId'),
          {
            teamId: TeamId.restore('teamId'),
            name: PairName.restore('PairName'),
            participantIds: [participantId1, participantId2],
          },
        );
        // 確認
        expect(pair).toBeInstanceOf(Pair);
        expect(pair.id).toEqual(PairId.restore('PairId'));
        expect(pair.teamId).toEqual(TeamId.restore('teamId'));
        expect(pair.name).toEqual(PairName.restore('PairName'));
        expect(pair.participantIds).toHaveLength(2);
        expect(pair.participantIds[0]).toEqual(participantId1);
        expect(pair.participantIds[1]).toEqual(participantId2);
      });
    });
  });

  describe('## Getter \n', () => {
    describe('## appendParticipant\n', () => {
      test('- teamId \n', () => {
        // 準備
        const pair = pairInstance();
        // 実行 確認
        expect(pair.teamId).toEqual(TeamId.restore('teamId'));
      });

      test('- name \n', () => {
        // 準備
        const pair = pairInstance();
        // 実行 確認
        expect(pair.name).toEqual(PairName.restore('PairName'));
      });

      test('- participantIds \n', () => {
        // 準備
        const pair = pairInstance();
        // 実行 確認
        expect(pair.participantIds).toEqual([participantId1, participantId2]);
      });

      test('- lastParticipant \n', () => {
        // 準備
        const pair = pairInstance();
        // 実行 確認
        expect(pair.lastParticipant).toEqual(participantId2);
      });

      test('- participantsLength \n', () => {
        // 準備
        const pair = pairInstance();
        // 実行 確認
        expect(pair.participantsLength).toEqual(2);
      });

      test('- hasValidNumberOfParticipants \n', () => {
        // 準備
        const pair = pairInstance();
        // 実行 確認
        expect(pair.hasValidNumberOfParticipants).toEqual(true);
      });

      test('- hasExceededMaxParticipants \n', () => {
        // 準備
        const pair = pairInstance();
        // 実行 確認
        expect(pair.hasExceededMaxParticipants).toEqual(false);
      });
    });

    describe('## Method\n', () => {
      describe('### appendParticipant\n', () => {
        test('- Success create instance \n', () => {
          // 準備
          const pair = pairInstance();
          // 実行
          pair.appendParticipant(participantId3);
          // 確認
          expect(pair.participantIds).toHaveLength(3);
          expect(pair.participantIndexAt(2)).toEqual(participantId3);
        });
      });

      describe('## removeParticipant\n', () => {
        test('- Success create instance \n', () => {
          // 準備
          const pair = pairInstance();
          // 実行
          pair.removeParticipant(participantId2);
          // 確認
          expect(pair.participantIds).toHaveLength(1);
          expect(pair.participantIndexAt(1)).toBeNull();
        });
      });
    });
  });
});
