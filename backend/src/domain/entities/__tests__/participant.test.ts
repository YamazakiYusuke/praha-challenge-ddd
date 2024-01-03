import { Participant } from "src/domain/entities/participant";
import { Email } from "src/domain/values/email";
import { Id } from "src/domain/values/id";
import { PersonName } from "src/domain/values/person-name";
import { EnrollmentStatusValue } from "src/util/enums";



describe('# Participant Entity UnitTest \n', () => {
  function getParticipant(): Participant {
    const participantId = Id.restore('participantId');
    const name = PersonName.restore('PersonName');
    const email = Email.restore('test@example.com');
    const teamId = undefined;
    const pairId = undefined;
    const enrollmentStatus = EnrollmentStatusValue.OnLeave;
    const props = {
      name: name,
      email: email,
      teamId: teamId,
      pairId: pairId,
      enrollmentStatus: enrollmentStatus,
    };
    return Participant.restore(participantId, props);
  }
  
  describe('## restore \n', () => {
    it('- Success create instance \n', () => {
      // 準備
      const participantId = Id.restore('participantId');
      const name = PersonName.restore('PersonName');
      const email = Email.restore('test@example.com');
      const teamId = Id.restore('teamId');
      const pairId = Id.restore('pairId');
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

  describe('## changeEnrollmentStatusToEnrolled \n', () => {
    it('- Success change status \n', () => {
      // 準備
      const participant = getParticipant();
      const newTeamId = Id.restore('teamId');
      const newPairId = Id.restore('pairId');
      // 実行
      participant.changeEnrollmentStatusToEnrolled(newTeamId, newPairId);
      // 確認
      expect(participant.enrollmentStatus).toEqual(EnrollmentStatusValue.Enrolled);
      expect(participant.teamId).toEqual(newTeamId);
      expect(participant.pairId).toEqual(newPairId);
    });
  });

  describe('## changeEnrollmentStatusToOnLeave \n', () => {
    it('- Success change status \n', () => {
      // 準備
      const participant = getParticipant();
      // 実行
      participant.changeEnrollmentStatusToOnLeave();
      // 確認
      expect(participant.enrollmentStatus).toEqual(EnrollmentStatusValue.OnLeave);
      expect(participant.teamId).toBeUndefined();
      expect(participant.pairId).toBeUndefined();
    });
  });

  describe('## changeEnrollmentStatusToWithDrawn \n', () => {
    it('- Success change status \n', () => {
      // 準備
      const participant = getParticipant();
      // 実行
      participant.changeEnrollmentStatusToWithDrawn();
      // 確認
      expect(participant.enrollmentStatus).toEqual(EnrollmentStatusValue.Withdrawn);
      expect(participant.teamId).toBeUndefined();
      expect(participant.pairId).toBeUndefined();
    });
  });

  describe('## deleteTeamIdPairId \n', () => {
    it('- Success change status \n', () => {
      // 準備
      const participant = getParticipant();
      // 実行
      participant.deleteTeamIdPairId();
      // 確認
      expect(participant.teamId).toBeUndefined();
      expect(participant.pairId).toBeUndefined();
    });
  });
});


