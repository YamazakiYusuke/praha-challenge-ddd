import { SaveAssignmentProgressCommand } from 'src/domain/commands/assignment-progress/save-assignment-progress-command';
import { AssignmentProgress } from 'src/domain/entities/assignment-progress';
import { ChangeAssignmentProgressService } from 'src/domain/services/assignment_progress/change-assignment-progress-service';
import { AssignmentId, AssignmentProgressId, ParticipantId } from 'src/domain/values/ids';
import { AssignmentProgressStateValue } from 'src/util/enums';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# ChangeAssignmentProgressService UnitTest\n', () => {
  let saveAssignmentProgressCommand: SaveAssignmentProgressCommand;
  let changeAssignmentProgressService: ChangeAssignmentProgressService;
  let assignmentProgress: AssignmentProgress;
  const id = AssignmentProgressId.restore('Id');
  const newState = AssignmentProgressStateValue.Completed;

  beforeEach(() => {
    saveAssignmentProgressCommand = mock(SaveAssignmentProgressCommand);
    changeAssignmentProgressService = new ChangeAssignmentProgressService(instance(saveAssignmentProgressCommand));

    assignmentProgress = AssignmentProgress.restore(id, {
      assignmentId: AssignmentId.create(),
      participantId: ParticipantId.create(),
      assignmentProgressState: AssignmentProgressStateValue.NotStarted,
    });
  });

  describe('## execute\n', () => {
    test('- should change assignment progress state successfully\n', async () => {
      // 準備
      when(saveAssignmentProgressCommand.execute(anything())).thenResolve();
      // 実行
      await changeAssignmentProgressService.execute(assignmentProgress, newState);
      // 確認
      verify(saveAssignmentProgressCommand.execute(anything())).once();
      expect(assignmentProgress.assignmentProgressState).toEqual(AssignmentProgressStateValue.Completed);
    });
  });
});
