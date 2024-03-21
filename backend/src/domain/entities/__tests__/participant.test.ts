import { Participant } from "src/domain/entities/participant";
import { EntityError } from "src/domain/errors/entity_error";
import { Email } from "src/domain/values/email";
import { PairId, ParticipantId, TeamId } from "src/domain/values/id";
import { PersonName } from "src/domain/values/name";
import { EnrollmentStatusValue } from "src/util/enums";

describe('# Participant Entity UnitTest \n', () => {
  describe('## restore \n', () => {
    it('- Success create instance \n', () => {
      // 準備
      const participantId = ParticipantId.restore('participantId');
      const name = PersonName.restore('PersonName');
      const email = Email.restore('test@example.com');
      const teamId = TeamId.restore('teamId');
      const pairId = PairId.restore('pairId');
      const enrollmentStatus = EnrollmentStatusValue.Enrolled;
      const props = {
        name: name,
        email: email,
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: enrollmentStatus,
      };
      const participant = Participant.restore(participantId, props);
      // 実行・確認
      expect(participant).toBeInstanceOf(Participant);
      expect(participant.name).toEqual(name);
      expect(participant.email).toEqual(email);
      expect(participant.teamId).toEqual(teamId);
      expect(participant.pairId).toEqual(pairId);
      expect(participant.enrollmentStatus).toEqual(enrollmentStatus);
    });
  });

  function getParticipant(enrollmentStatusValue: EnrollmentStatusValue): Participant {
    const participantId = ParticipantId.restore('participantId');
    const name = PersonName.restore('PersonName');
    const email = Email.restore('test@example.com');
    const teamId = enrollmentStatusValue == EnrollmentStatusValue.Enrolled ? TeamId.restore('teamId') : undefined;
    const pairId = enrollmentStatusValue == EnrollmentStatusValue.Enrolled ? PairId.restore('pairId') : undefined;
    const enrollmentStatus = enrollmentStatusValue;
    const props = {
      name: name,
      email: email,
      teamId: teamId,
      pairId: pairId,
      enrollmentStatus: enrollmentStatus,
    };
    return Participant.restore(participantId, props);
  }

  describe('## changeEnrollmentStatusToEnrolled \n', () => {
    it('- Success change status \n', () => {
      // 準備
      const participant = getParticipant(EnrollmentStatusValue.OnLeave);
      const newTeamId = TeamId.restore('teamId');
      const newPairId = PairId.restore('pairId');
      // 実行
      participant.changeEnrollmentStatusToEnrolled(newTeamId, newPairId);
      // 確認
      expect(participant.enrollmentStatus).toEqual(EnrollmentStatusValue.Enrolled);
      expect(participant.teamId).toEqual(newTeamId);
      expect(participant.pairId).toEqual(newPairId);
    });

    it('- Failed change status \n', () => {
      // 準備
      const participant = getParticipant(EnrollmentStatusValue.Withdrawn);
      const newTeamId = TeamId.restore('newTeamId');
      const newPairId = PairId.restore('newPairId');
      // 実行・確認
      expect(() => participant.changeEnrollmentStatusToEnrolled(newTeamId, newPairId)).toThrow(EntityError);
    });
  });

  describe('## changeEnrollmentStatusToOnLeave \n', () => {
    it('- Success change status \n', () => {
      // 準備
      const participant = getParticipant(EnrollmentStatusValue.Enrolled);
      // 実行
      participant.changeEnrollmentStatusToOnLeave();
      // 確認
      expect(participant.enrollmentStatus).toEqual(EnrollmentStatusValue.OnLeave);
      expect(participant.teamId).toBeUndefined();
      expect(participant.pairId).toBeUndefined();
    });

    it('- Failed change status \n', () => {
      // 準備
      const participant = getParticipant(EnrollmentStatusValue.Withdrawn);
      // 実行・確認
      expect(() => participant.changeEnrollmentStatusToOnLeave()).toThrow(EntityError);
    });
  });

  describe('## changeEnrollmentStatusToWithDrawn \n', () => {
    it('- Success change status \n', () => {
      // 準備
      const participant = getParticipant(EnrollmentStatusValue.Enrolled);
      // 実行
      participant.changeEnrollmentStatusToWithDrawn();
      // 確認
      expect(participant.enrollmentStatus).toEqual(EnrollmentStatusValue.Withdrawn);
      expect(participant.teamId).toBeUndefined();
      expect(participant.pairId).toBeUndefined();
    });

    it('- Failed change status \n', () => {
      // 準備
      const participant = getParticipant(EnrollmentStatusValue.Withdrawn);
      // 実行・確認
      expect(() => participant.changeEnrollmentStatusToWithDrawn()).toThrow(EntityError);
    });
  });
});


