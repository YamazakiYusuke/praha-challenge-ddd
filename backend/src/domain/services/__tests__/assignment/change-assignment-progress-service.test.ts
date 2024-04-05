import { GetAssignmentProgressByIdQuery } from 'src/domain/commands/assignment-progress/get-assignment-progress-by-id-query';
import { SaveAssignmentProgressCommand } from 'src/domain/commands/assignment-progress/save-assignment-progress-command';
import { AssignmentProgress } from 'src/domain/entities/assignment-progress';
import { ChangeAssignmentProgressService } from 'src/domain/services/assignment/change-assignment-progress-service';
import { AssignmentId, AssignmentProgressId, ParticipantId } from 'src/domain/values/id';
import { AssignmentProgressStateValue } from 'src/util/enums';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# ChangeAssignmentProgressService UnitTest\n', () => {
  let getAssignmentProgressByIdQuery: GetAssignmentProgressByIdQuery;
  let saveAssignmentProgressCommand: SaveAssignmentProgressCommand;
  let changeAssignmentProgressService: ChangeAssignmentProgressService;
  let assignmentProgress: AssignmentProgress;
  const id = AssignmentProgressId.restore('Id');
  const newState = AssignmentProgressStateValue.Completed;

  beforeEach(() => {
    getAssignmentProgressByIdQuery = mock(GetAssignmentProgressByIdQuery);
    saveAssignmentProgressCommand = mock(SaveAssignmentProgressCommand);
    changeAssignmentProgressService = new ChangeAssignmentProgressService(instance(getAssignmentProgressByIdQuery), instance(saveAssignmentProgressCommand));

    assignmentProgress = AssignmentProgress.restore(id, {
      assignmentId: AssignmentId.create(),
      participantId: ParticipantId.create(),
      assignmentProgressState: AssignmentProgressStateValue.NotStarted,
    });
  });

  describe('## execute\n', () => {
    test('- should change assignment progress state successfully\n', async () => {
      // 準備
      when(getAssignmentProgressByIdQuery.execute(id)).thenResolve(assignmentProgress);
      when(saveAssignmentProgressCommand.execute(anything())).thenResolve();
      // 実行
      await changeAssignmentProgressService.execute(id, newState);
      // 確認
      verify(getAssignmentProgressByIdQuery.execute(id)).once();
      verify(saveAssignmentProgressCommand.execute(anything())).once();
      expect(assignmentProgress.assignmentProgressState).toEqual(AssignmentProgressStateValue.Completed);
    });

    test('- should throw error if assignment progress does not exist\n', async () => {
      // 準備
      when(getAssignmentProgressByIdQuery.execute(id)).thenResolve(null);
      // 実行・確認
      await expect(changeAssignmentProgressService.execute(id, newState)).rejects.toThrow();
      verify(getAssignmentProgressByIdQuery.execute(id)).once();
    });
  });
});
