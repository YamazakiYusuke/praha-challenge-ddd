import { EntityError } from "src/domain/errors/entity_error";
import { AssignmentProgressState } from "src/domain/values/assignment-progress-state";
import { Id } from "src/domain/values/id";
import { AssignmentProgressStateValue } from "src/util/enums";
import { AssignmentProgress, AssignmentProgressProps } from "../assignment-progress";

describe('# AssignmentProgress Entity UnitTest\n', () => {
  describe('## create\n', () => {
    test('- Success create instance \n', () => {
      // 準備
      const assignmentId = Id.restore('assignmentId');
      const participantId = Id.restore('participantId');
      const assignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.NotStarted.toString());
      const props: AssignmentProgressProps = { assignmentId, participantId, assignmentProgressState };
      // 実行
      const assignmentProgress = AssignmentProgress.create(props) as AssignmentProgress;
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
      const id = Id.restore('Id');
      const assignmentId = Id.restore('assignmentId');
      const participantId = Id.restore('participantId');
      const assignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.NotStarted.toString());
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
    const id = Id.restore('Id');
    const assignmentId = Id.restore('assignmentId');
    const participantId = Id.restore('participantId');
    const assignmentProgressState = AssignmentProgressState.restore(assignmentProgressStateValue.toString());
    const props: AssignmentProgressProps = { assignmentId, participantId, assignmentProgressState };
    return AssignmentProgress.restore(id, props);
  }

  describe('## changeAssignmentProgressState\n', () => {
    test('- Success to change value \n', () => {
      // 準備
      const assignmentProgress = getAssignmentProgress();
      const newAssignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.Completed.toString());
      // 実行
      assignmentProgress.changeAssignmentProgressState(newAssignmentProgressState);
      // 確認
      expect(assignmentProgress.assignmentProgressState).toEqual(newAssignmentProgressState);
    });

    test('- Failed to change value \n', () => {
      // 準備
      const assignmentProgress = getAssignmentProgress(AssignmentProgressStateValue.Completed);
      const newAssignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.NotStarted.toString());
      // 実行・確認
      expect(() => assignmentProgress.changeAssignmentProgressState(newAssignmentProgressState)).toThrow(EntityError);
    });
  });
});
