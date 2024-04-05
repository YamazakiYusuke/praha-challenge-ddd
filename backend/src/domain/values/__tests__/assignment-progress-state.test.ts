import { AssignmentProgressStateValue } from "src/util/enums";

describe('# AssignmentProgressState UnitTest \n', () => {
  describe('## create \n', () => {
    it('- Success create instance \n', () => {
      // 準備
      const assignmentProgressState = AssignmentProgressStateValue.NotStarted;
      // 実行・確認
      expect(assignmentProgressState).toEqual(AssignmentProgressStateValue.NotStarted);
    });
  });

  describe('## restore \n', () => {
    it('- Success restore instance \n', () => {
      // 準備
      const assignmentProgressState = AssignmentProgressStateValue.Completed;
      // 実行・確認
      expect(assignmentProgressState).toEqual(AssignmentProgressStateValue.Completed);
    });
  });
});
