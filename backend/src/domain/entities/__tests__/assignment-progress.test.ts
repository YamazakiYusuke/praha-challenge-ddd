import { EntityError } from "src/domain/errors/entity_error";
import { AssignmentProgressState } from "src/domain/values/assignment-progress-state";
import { AssignmentId, AssignmentProgressId, ParticipantId } from "src/domain/values/id";
import { AssignmentProgressStateValue } from "src/util/enums";
import { AssignmentProgress, AssignmentProgressProps } from "../assignment-progress";

describe('# AssignmentProgress Entity UnitTest\n', () => {
  describe('## create\n', () => {
    test('- Success create instance \n', () => {
      // 準備
      const assignmentId = AssignmentId.restore('assignmentId');
      const participantId = ParticipantId.restore('participantId');
      const assignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.NotStarted);
      const props: AssignmentProgressProps = { assignmentId, participantId, assignmentProgressState };
      // 実行
      const assignmentProgress = AssignmentProgress.create(props);
      // 確認
      expect(assignmentProgress).toBeInstanceOf(AssignmentProgress);
      expect(assignmentProgress.assignmentId).toEqual(assignmentId);
      expect(assignmentProgress.participantId).toEqual(participantId);
      expect(assignmentProgress.assignmentProgressState).toEqual(assignmentProgressState);
    });
  });

  describe('## restore\n', () => {
    test('- Success create instance \n', () => {
      // 準備
      const id = AssignmentProgressId.restore('Id');
      const assignmentId = AssignmentId.restore('assignmentId');
      const participantId = ParticipantId.restore('participantId');
      const assignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.NotStarted);
      const props: AssignmentProgressProps = { assignmentId, participantId, assignmentProgressState };
      // 実行
      const assignmentProgress = AssignmentProgress.restore(id, props);
      // 確認
      expect(assignmentProgress).toBeInstanceOf(AssignmentProgress);
      expect(assignmentProgress.assignmentId).toEqual(assignmentId);
      expect(assignmentProgress.participantId).toEqual(participantId);
      expect(assignmentProgress.assignmentProgressState).toEqual(assignmentProgressState);
    });
  });

  function getAssignmentProgress(
    assignmentProgressStateValue: AssignmentProgressStateValue = AssignmentProgressStateValue.NotStarted,
  ): AssignmentProgress {
    const id = AssignmentProgressId.restore('Id');
    const assignmentId = AssignmentId.restore('assignmentId');
    const participantId = ParticipantId.restore('participantId');
    const assignmentProgressState = AssignmentProgressState.restore(assignmentProgressStateValue);
    const props: AssignmentProgressProps = { assignmentId, participantId, assignmentProgressState };
    return AssignmentProgress.restore(id, props);
  }

  describe('## changeAssignmentProgressState\n', () => {
    test('- Success to change value \n', () => {
      // 準備
      const assignmentProgress = getAssignmentProgress();
      const newAssignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.Completed);
      // 実行
      assignmentProgress.changeAssignmentProgressState(newAssignmentProgressState);
      // 確認
      expect(assignmentProgress.assignmentProgressState).toEqual(newAssignmentProgressState);
    });

    test('- Failed to change value \n', () => {
      // 準備
      const assignmentProgress = getAssignmentProgress(AssignmentProgressStateValue.Completed);
      const newAssignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.NotStarted);
      // 実行・確認
      expect(() => assignmentProgress.changeAssignmentProgressState(newAssignmentProgressState)).toThrow(EntityError);
    });
  });
});
