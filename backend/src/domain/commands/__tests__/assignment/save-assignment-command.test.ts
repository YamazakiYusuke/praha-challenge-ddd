import { SaveAssignmentCommand } from 'src/domain/commands/assignment/save-assignment-command';
import { Assignment } from 'src/domain/entities/assignment';
import { IAssignmentRepository } from 'src/domain/repositories/assignment-repository';
import { CategoryId } from 'src/domain/values/ids';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# SaveAssignmentCommand UnitTest \n', () => {
  let command: SaveAssignmentCommand;
  let assignmentRepository: IAssignmentRepository;

  beforeEach(() => {
    assignmentRepository = mock<IAssignmentRepository>();
    command = new SaveAssignmentCommand(instance(assignmentRepository));
  });

  it('- should save assignment \n', async () => {
    // 準備
    const assignment = Assignment.create({
      number: 1,
      title: 'Test Assignment',
      categoryId: CategoryId.create(),
      introduction: 'Introduction to Test Assignment',
      content: 'Content of Test Assignment'
    });
    const transaction = {};

    when(assignmentRepository.save(anything(), anything())).thenResolve();

    // 実行
    await command.execute(assignment, transaction);

    // 確認
    verify(assignmentRepository.save(assignment, transaction)).once();
  });
});
