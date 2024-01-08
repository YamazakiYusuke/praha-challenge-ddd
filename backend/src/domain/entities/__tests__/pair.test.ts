import { Pair } from "src/domain/entities/pair";
import { Email } from "src/domain/values/email";
import { Id, PairId, ParticipantId, ParticipantsId, TeamId } from "src/domain/values/id";
import { PairName, PersonName } from "src/domain/values/name";
import { EnrollmentStatusValue } from "src/util/enums";
import { Participant } from "../participant";
import { Participants } from "../participants";

describe('# Pair Entity UnitTest\n', () => {
  const participant1 = (enrollmentStatus: EnrollmentStatusValue) => Participant.restore(
    ParticipantId.restore('participantId1'),
    {
      name: PersonName.restore('PersonName1'),
      email: Email.restore('test1@example.com'),
      teamId: enrollmentStatus == EnrollmentStatusValue.Enrolled ? TeamId.restore('teamId1') : undefined,
      pairId: enrollmentStatus == EnrollmentStatusValue.Enrolled ? PairId.restore('pairId1') : undefined,
      enrollmentStatus: enrollmentStatus,
    },
  );
  const participant2 = (enrollmentStatus: EnrollmentStatusValue) => Participant.restore(
    ParticipantId.restore('participantId2'),
    {
      name: PersonName.restore('PersonName2'),
      email: Email.restore('test2@example.com'),
      teamId: enrollmentStatus == EnrollmentStatusValue.Enrolled ? TeamId.restore('teamId2') : undefined,
      pairId: enrollmentStatus == EnrollmentStatusValue.Enrolled ? PairId.restore('pairId2') : undefined,
      enrollmentStatus: enrollmentStatus,
    },
  );
  const participant3 = (enrollmentStatus: EnrollmentStatusValue) => Participant.restore(
    ParticipantId.restore('participantId3'),
    {
      name: PersonName.restore('PersonName3'),
      email: Email.restore('test3@example.com'),
      teamId: enrollmentStatus == EnrollmentStatusValue.Enrolled ? TeamId.restore('teamId3') : undefined,
      pairId: enrollmentStatus == EnrollmentStatusValue.Enrolled ? PairId.restore('pairId3') : undefined,
      enrollmentStatus: enrollmentStatus,
    },
  );
  const participants = (enrollmentStatus: EnrollmentStatusValue) => Participants.restore(
    ParticipantsId.restore('ParticipantsId'),
    [participant1(enrollmentStatus), participant2(enrollmentStatus)],
  );
  const pair = () => Pair.restore(
    PairId.restore('PairId'),
    {
      teamId: TeamId.restore('teamId'),
      name: PairName.restore('PairName'),
      participants: participants(EnrollmentStatusValue.Enrolled),
    },
  );

  describe('## create\n', () => {
    test('- Success create instance \n', () => {
      // 準備・実行
      const pair = Pair.create(
        {
          teamId: PairId.restore('teamId'),
          name: PairName.restore('PairName'),
          participants: participants(EnrollmentStatusValue.OnLeave),
        },
      ) as Pair;
      // 確認
      expect(pair).toBeInstanceOf(Pair);
      expect(pair.teamId).toEqual(TeamId.restore('teamId'));
      expect(pair.name).toEqual(PairName.restore('PairName'));
      expect(pair.participants.value).toHaveLength(2);
      expect(pair.participants.value[0]?.getId).toEqual(ParticipantId.restore('participantId1'));
      expect(pair.participants.value[0]?.name).toEqual(PersonName.restore('PersonName1'));
      expect(pair.participants.value[0]?.email).toEqual(Email.restore('test1@example.com'));
      expect(pair.participants.value[0]?.teamId).toBeDefined();
      expect(pair.participants.value[0]?.pairId).toBeDefined();
      expect(pair.participants.value[0]?.enrollmentStatus).toEqual(EnrollmentStatusValue.Enrolled);
      expect(pair.participants.value[1]?.getId).toEqual(ParticipantId.restore('participantId2'));
      expect(pair.participants.value[1]?.name).toEqual(PersonName.restore('PersonName2'));
      expect(pair.participants.value[1]?.email).toEqual(Email.restore('test2@example.com'));
      expect(pair.participants.value[1]?.teamId).toBeDefined();
      expect(pair.participants.value[1]?.pairId).toBeDefined();
      expect(pair.participants.value[1]?.enrollmentStatus).toEqual(EnrollmentStatusValue.Enrolled);
    });
  });

  describe('## restore\n', () => {
    test('- Success restore instance \n', () => {
      // 準備・実行
      const pair = Pair.restore(
        PairId.restore('PairId'),
        {
          teamId: TeamId.restore('teamId'),
          name: PairName.restore('PairName'),
          participants: participants(EnrollmentStatusValue.Enrolled),
        },
      );
      // 確認
      expect(pair).toBeInstanceOf(Pair);
      expect(pair.getId).toEqual(PairId.restore('PairId'));
      expect(pair.teamId).toEqual(TeamId.restore('teamId'));
      expect(pair.name).toEqual(PairName.restore('PairName'));
      expect(pair.participants.value).toHaveLength(2);
      expect(pair.participants.value[0]?.getId).toEqual(ParticipantId.restore('participantId1'));
      expect(pair.participants.value[0]?.name).toEqual(PersonName.restore('PersonName1'));
      expect(pair.participants.value[0]?.email).toEqual(Email.restore('test1@example.com'));
      expect(pair.participants.value[0]?.teamId).toEqual(TeamId.restore('teamId1'));
      expect(pair.participants.value[0]?.pairId).toEqual(PairId.restore('pairId1'));
      expect(pair.participants.value[0]?.enrollmentStatus).toEqual(EnrollmentStatusValue.Enrolled);
      expect(pair.participants.value[1]?.getId).toEqual(ParticipantsId.restore('participantId2'));
      expect(pair.participants.value[1]?.name).toEqual(PersonName.restore('PersonName2'));
      expect(pair.participants.value[1]?.email).toEqual(Email.restore('test2@example.com'));
      expect(pair.participants.value[1]?.teamId).toEqual(TeamId.restore('teamId2'));
      expect(pair.participants.value[1]?.pairId).toEqual(PairId.restore('pairId2'));
      expect(pair.participants.value[1]?.enrollmentStatus).toEqual(EnrollmentStatusValue.Enrolled);
    });
  });

  describe('## appendParticipant\n', () => {
    test('- Success create instance \n', () => {
      // 準備
      const pairInstance = pair();
      const newParticipant = participant3(EnrollmentStatusValue.OnLeave);
      // 実行
      pairInstance.appendParticipant(newParticipant);
      // 確認
      expect(pairInstance.participants.value).toHaveLength(3);
      expect(pairInstance.participants.getByIndex(2)).toEqual(newParticipant);
    });
  });

  describe('## removeParticipant\n', () => {
    test('- Success create instance \n', () => {
      // 準備
      const pairInstance = pair();
      // 実行
      pairInstance.removeParticipant(participant2(EnrollmentStatusValue.Enrolled));
      // 確認
      expect(pairInstance.participants.value).toHaveLength(1);
      expect(pairInstance.participants.getByIndex(1)).toBeUndefined();
    });
  });

  describe('## changeParticipantEnrollmentStatusToOnLeave\n', () => {
    test('- Success restore instance \n', () => {
      // 準備
      const pairInstance = pair();
      // 実行
      pairInstance.changeParticipantEnrollmentStatusToOnLeave(participant2(EnrollmentStatusValue.Enrolled));
      // 確認
      expect(pairInstance.participants.value).toHaveLength(1);
      expect(pairInstance.participants.getByIndex(1)).toBeUndefined();
    });
  });

  describe('## changeParticipantEnrollmentStatusToWithDrawn\n', () => {
    test('- Success restore instance \n', () => {
      // 準備
      const pairInstance = pair();
      // 実行
      pairInstance.changeParticipantEnrollmentStatusToWithDrawn(participant2(EnrollmentStatusValue.Enrolled));
      // 確認
      expect(pairInstance.participants.value).toHaveLength(1);
      expect(pairInstance.participants.getByIndex(1)).toBeUndefined();
    });
  });
});
