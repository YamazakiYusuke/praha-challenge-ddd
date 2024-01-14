import { AssignmentProgressState } from "src/domain/values/assignment-progress-state";
import { AssignmentProgressStateValue } from "src/util/enums";

describe('# AssignmentProgressState UnitTest \n', () => {
  describe('## create \n', () => {
    it('- Success create instance \n', () => {
      // 準備
      const assignmentProgressState = AssignmentProgressState.create(AssignmentProgressStateValue.NotStarted) as AssignmentProgressState;
      // 実行・確認
      expect(assignmentProgressState).toBeInstanceOf(AssignmentProgressState);
      expect(assignmentProgressState.value).toEqual(AssignmentProgressStateValue.NotStarted.toString());
    });
  });

  describe('## restore \n', () => {
    it('- Success restore instance \n', () => {
      // 準備
      const assignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.Completed);
      // 実行・確認
      expect(assignmentProgressState).toBeInstanceOf(AssignmentProgressState);
      expect(assignmentProgressState.value).toEqual(AssignmentProgressStateValue.Completed.toString());
    });
  });

  describe('## isCompleted \n', () => {
    it('- Check if completed \n', () => {
      // 準備
      const assignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.Completed);
      // 実行・確認
      expect(assignmentProgressState.isCompleted).toBe(true);
    });

    it('- Check if not completed \n', () => {
      // 準備
      const assignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.NotStarted);
      // 実行・確認
      expect(assignmentProgressState.isCompleted).toBe(false);
    });
  });
});
