import { SaveAssignmentProgressCommand } from 'src/domain/commands/assignment-progress/save-assignment-progress-command';
import { AssignmentProgress } from 'src/domain/entities/assignment-progress';
import { IAssignmentProgressRepository } from 'src/domain/repositories/assignment-progress-repository';
import { AssignmentProgressStateValue } from 'src/domain/util/enums';
import { AssignmentId, AssignmentProgressId, ParticipantId } from 'src/domain/values/ids';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# SaveAssignmentProgressCommand UnitTest \n', () => {
  let command: SaveAssignmentProgressCommand;
  let assignmentProgressRepository: IAssignmentProgressRepository;

  beforeEach(() => {
    assignmentProgressRepository = mock<IAssignmentProgressRepository>();
    command = new SaveAssignmentProgressCommand(instance(assignmentProgressRepository));
  });

  it('- should save assignment progress \n', async () => {
    // 準備
    const assignmentProgressId = AssignmentProgressId.create();
    const assignmentProgress = AssignmentProgress.restore(assignmentProgressId, {
      assignmentId: AssignmentId.create(),
      participantId: ParticipantId.create(),
      assignmentProgressState: AssignmentProgressStateValue.NotStarted
    });
    const transaction = {};

    when(assignmentProgressRepository.save(anything(), anything())).thenResolve();

    // 実行
    await command.execute(assignmentProgress, transaction);

    // 確認
    verify(assignmentProgressRepository.save(assignmentProgress, transaction)).once();
  });
});
