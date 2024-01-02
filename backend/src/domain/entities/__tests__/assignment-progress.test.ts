import { EntityError } from "src/domain/errors/entity_error";
import { AssignmentProgressState } from "src/domain/values/assignment-progress-state";
import { Id } from "src/domain/values/id";
import { AssignmentProgressStateValue } from "src/util/enums";
import { AssignmentProgress, AssignmentProgressProps } from "../assignment-progress";

describe('# AssignmentProgress Entity UnitTest\n', () => {
  describe('## create\n', () => {
    test('- Success create instance \n', () => {
      // 準備
      const assignmentId = Id.create();
      const participantId = Id.create();
      const assignmentProgressState = AssignmentProgressState.create() as AssignmentProgressState;
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
      const id = Id.create();
      const assignmentId = Id.create();
      const participantId = Id.create();
      const assignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.NotStarted.toString()) as AssignmentProgressState;
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

  describe('## assignmentProgressState\n', () => {
    test('- Success to get instance \n', () => {
      // 準備
      const assignmentId = Id.create();
      const participantId = Id.create();
      const assignmentProgressState = AssignmentProgressState.create() as AssignmentProgressState;
      const props: AssignmentProgressProps = { assignmentId, participantId, assignmentProgressState };
      // 実行
      const assignmentProgress = AssignmentProgress.create(props) as AssignmentProgress;
      // 確認
      expect(assignmentProgress.assignmentProgressState).toEqual(assignmentProgressState);
    });
  });

  describe('## changeAssignmentProgressState\n', () => {
    test('- Success to change value \n', () => {
      // 準備
      const assignmentId = Id.create();
      const participantId = Id.create();
      const assignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.NotStarted.toString()) as AssignmentProgressState;
      const newAssignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.Completed.toString()) as AssignmentProgressState;
      const props: AssignmentProgressProps = { assignmentId, participantId, assignmentProgressState };
      const assignmentProgress = AssignmentProgress.create(props) as AssignmentProgress;
      // 実行
      assignmentProgress.changeAssignmentProgressState(newAssignmentProgressState);
      // 確認
      expect(assignmentProgress.assignmentProgressState).toEqual(newAssignmentProgressState);
    });

    test('- Failed to change value \n', () => {
      // 準備
      const assignmentId = Id.create();
      const participantId = Id.create();
      const assignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.Completed.toString()) as AssignmentProgressState;
      const newAssignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.NotStarted.toString()) as AssignmentProgressState;
      const props: AssignmentProgressProps = { assignmentId, participantId, assignmentProgressState };
      const assignmentProgress = AssignmentProgress.create(props) as AssignmentProgress;
      // 実行・確認
      expect(() => assignmentProgress.changeAssignmentProgressState(newAssignmentProgressState)).toThrow(EntityError);
    });
  });
});
