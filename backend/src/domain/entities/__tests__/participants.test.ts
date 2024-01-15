import { Participant } from "src/domain/entities/participant";
import { Participants } from "src/domain/entities/participants";
import { EntityError } from "src/domain/errors/entity_error";
import { Email } from "src/domain/values/email";
import { Id, PairId, ParticipantId, ParticipantsId, TeamId } from "src/domain/values/id";
import { PersonName } from "src/domain/values/name";
import { EnrollmentStatusValue } from "src/util/enums";

describe('# Participants Entity UnitTest \n', () => {
  describe('## create \n', () => {
    it('- Success create instance \n', () => {
      // 準備
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      // 実行
      const participants = Participants.create([participant1, participant2]) as Participants;
      // 確認
      expect(participants).toBeInstanceOf(Participants);
      expect(participants.value).toHaveLength(2);
      expect(participants.value[0]).toBe(participant1);
      expect(participants.value[1]).toBe(participant2);
    });

    it('- Failed create instance (メンバーが0人) \n', () => {
      // 準備・実行・確認
      expect(() => Participants.create([])).toThrow(EntityError);
    });

    it('- Failed create instance (メンバーが4人) \n', () => {
      // 準備
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props3 = {
        name: PersonName.restore('PersonName3'),
        email: Email.restore('test3@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props4 = {
        name: PersonName.restore('PersonName4'),
        email: Email.restore('test4@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participant3 = Participant.restore(ParticipantId.restore('participantId3'), props3);
      const participant4 = Participant.restore(ParticipantId.restore('participantId4'), props4);
      // 実行・確認
      expect(() => Participants.create([participant1, participant2, participant3, participant4])).toThrow(EntityError);
    });
  });

  describe('## restore \n', () => {
    it('- Success restore instance \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      // 実行
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      // 確認
      expect(participants).toBeInstanceOf(Participants);
      expect(participants.value).toHaveLength(2);
      expect(participants.getId).toBe(participantsId);
      expect(participants.value[0]).toBe(participant1);
      expect(participants.value[1]).toBe(participant2);
    });
  });

  describe('## length \n', () => {
    it('- Success restore instance \n', () => {
      // 準備
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      // 実行・確認
      expect(participants.length).toBe(2);
    });
  });

  describe('## last \n', () => {
    it('- Success append participant \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      // 実行・確認
      expect(participants.last).toBe(participant2);
    });
  });

  describe('## getByIndex \n', () => {
    it('- Success append participant \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      // 実行・確認
      expect(participants.getByIndex(0)).toBe(participant1);
      expect(participants.getByIndex(1)).toBe(participant2);
      expect(participants.getByIndex(2)).toBeUndefined();
    });
  });

  describe('## append \n', () => {
    it('- Success append participant \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);

      const props3 = {
        name: PersonName.restore('PersonName3'),
        email: Email.restore('test3@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant3 = Participant.restore(ParticipantId.restore('participantId3'), props3);
      // 実行
      participants.append(teamId, pairId, participant3);
      // 確認
      expect(participants.value).toHaveLength(3);
      expect(participants.value[0]).toBe(participant1);
      expect(participants.value[1]).toBe(participant2);
      expect(participants.value[2]).toBe(participant3);
    });

    it('- Failed append participant \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      // 実行・確認
      expect(() => participants.append(teamId, pairId, participant2)).toThrow(EntityError);
    });
  });

  describe('## remove \n', () => {
    it('- Success remove participant \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      // 実行
      participants.remove(participant2);
      // 確認
      expect(participants.value).toHaveLength(1);
      expect(participants.getByIndex(0)).toBe(participant1);
      expect(participants.getByIndex(1)).toBeUndefined();
    });

    it('- Failed remove participant \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      const props3 = {
        name: PersonName.restore('PersonName3'),
        email: Email.restore('test3@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant3 = Participant.restore(ParticipantId.restore('participantId3'), props3);
      // 実行・確認
      expect(() => participants.remove(participant3)).toThrow(EntityError);
    });
  });

  describe('## changeParticipantEnrollmentStatusToEnrolled \n', () => {
    it('- Success change participant status to enrolled \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: undefined,
        pairId: undefined,
        enrollmentStatus: EnrollmentStatusValue.OnLeave,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      // 実行
      participants.changeParticipantEnrollmentStatusToEnrolled(teamId, pairId, participant2.getId);
      // 確認
      expect(participants.value).toHaveLength(2);
      expect(participants.value[0]).toBe(participant1);
      expect(participants.value[1]?.name).toEqual(PersonName.restore('PersonName2'));
      expect(participants.value[1]?.email).toEqual(Email.restore('test2@example.com'));
      expect(participants.value[1]?.teamId).toBe(teamId);
      expect(participants.value[1]?.pairId).toBe(pairId);
      expect(participants.value[1]?.enrollmentStatus).toBe(EnrollmentStatusValue.Enrolled);
    });

    it('- Failed change participant status to enrolled \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: undefined,
        pairId: undefined,
        enrollmentStatus: EnrollmentStatusValue.OnLeave,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      const props3 = {
        name: PersonName.restore('PersonName3'),
        email: Email.restore('test3@example.com'),
        teamId: undefined,
        pairId: undefined,
        enrollmentStatus: EnrollmentStatusValue.OnLeave,
      };
      const participant3 = Participant.restore(ParticipantId.restore('participantId3'), props3);
      // 実行・確認
      expect(() => participants.changeParticipantEnrollmentStatusToEnrolled(teamId, pairId, participant3.getId)).toThrow(EntityError);
    });
  });

  describe('## changeParticipantEnrollmentStatusToOnLeave \n', () => {
    it('- Success change participant status to on leave \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      // 実行
      participants.changeParticipantEnrollmentStatusToOnLeave(participant2.getId);
      // 確認
      expect(participants.value).toHaveLength(2);
      expect(participants.value[0]).toBe(participant1);
      expect(participants.value[1]?.name).toEqual(PersonName.restore('PersonName2'));
      expect(participants.value[1]?.email).toEqual(Email.restore('test2@example.com'));
      expect(participants.value[1]?.teamId).toBeUndefined();
      expect(participants.value[1]?.pairId).toBeUndefined();
      expect(participants.value[1]?.enrollmentStatus).toBe(EnrollmentStatusValue.OnLeave);
    });

    it('- Failed change participant status to enrolled \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: undefined,
        pairId: undefined,
        enrollmentStatus: EnrollmentStatusValue.OnLeave,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      const props3 = {
        name: PersonName.restore('PersonName3'),
        email: Email.restore('test3@example.com'),
        teamId: undefined,
        pairId: undefined,
        enrollmentStatus: EnrollmentStatusValue.OnLeave,
      };
      const participant3 = Participant.restore(ParticipantId.restore('participantId3'), props3);
      // 実行・確認
      expect(() => participants.changeParticipantEnrollmentStatusToOnLeave(participant3.getId)).toThrow(EntityError);
    });
  });

  describe('## changeParticipantEnrollmentStatusToWithDrawn \n', () => {
    it('- Success change participant status to on leave \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      // 実行
      participants.changeParticipantEnrollmentStatusToWithDrawn(participant2.getId);
      // 確認
      expect(participants.value).toHaveLength(2);
      expect(participants.value[0]).toBe(participant1);
      expect(participants.value[1]?.name).toEqual(PersonName.restore('PersonName2'));
      expect(participants.value[1]?.email).toEqual(Email.restore('test2@example.com'));
      expect(participants.value[1]?.teamId).toBeUndefined();
      expect(participants.value[1]?.pairId).toBeUndefined();
      expect(participants.value[1]?.enrollmentStatus).toBe(EnrollmentStatusValue.Withdrawn);
    });

    it('- Failed change participant status to enrolled \n', () => {
      // 準備
      const participantsId = ParticipantsId.restore('ParticipantsId');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const props1 = {
        name: PersonName.restore('PersonName1'),
        email: Email.restore('test1@example.com'),
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: EnrollmentStatusValue.Enrolled,
      };
      const props2 = {
        name: PersonName.restore('PersonName2'),
        email: Email.restore('test2@example.com'),
        teamId: undefined,
        pairId: undefined,
        enrollmentStatus: EnrollmentStatusValue.OnLeave,
      };
      const participant1 = Participant.restore(ParticipantId.restore('participantId1'), props1);
      const participant2 = Participant.restore(ParticipantId.restore('participantId2'), props2);
      const participants = Participants.restore(participantsId, [participant1, participant2]);
      const props3 = {
        name: PersonName.restore('PersonName3'),
        email: Email.restore('test3@example.com'),
        teamId: undefined,
        pairId: undefined,
        enrollmentStatus: EnrollmentStatusValue.OnLeave,
      };
      const participant3 = Participant.restore(ParticipantId.restore('participantId3'), props3);
      // 実行・確認
      expect(() => participants.changeParticipantEnrollmentStatusToWithDrawn(participant3.getId)).toThrow(EntityError);
    });
  });
});
