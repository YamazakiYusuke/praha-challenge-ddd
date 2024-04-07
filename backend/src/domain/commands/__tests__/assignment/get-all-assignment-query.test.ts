import { GetAllAssignmentsQuery } from 'src/domain/commands/assignment/get-all-assignment-query';
import { Assignment } from 'src/domain/entities/assignment';
import { IAssignmentRepository } from 'src/domain/repositories/assignment-repository';
import { CategoryId } from 'src/domain/values/ids';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetAllAssignmentsQuery UnitTest \n', () => {
  let query: GetAllAssignmentsQuery;
  let assignmentRepository: IAssignmentRepository;

  beforeEach(() => {
    assignmentRepository = mock<IAssignmentRepository>();
    query = new GetAllAssignmentsQuery(instance(assignmentRepository));
  });

  it('- should get all assignments \n', async () => {
    // 準備
    const assignment1 = Assignment.create({
      number: 1,
      title: 'Assignment 1',
      categoryId: CategoryId.create(),
      introduction: 'Introduction to Assignment 1',
      content: 'Content of Assignment 1'
    });
    const assignment2 = Assignment.create({
      number: 2,
      title: 'Assignment 2',
      categoryId: CategoryId.create(),
      introduction: 'Introduction to Assignment 2',
      content: 'Content of Assignment 2'
    });
    const assignments: Assignment[] = [assignment1, assignment2];

    when(assignmentRepository.getAll()).thenResolve(assignments);

    // 実行
    const result = await query.execute();

    // 確認
    expect(result).toEqual(assignments);
    verify(assignmentRepository.getAll()).once();
  });
});
