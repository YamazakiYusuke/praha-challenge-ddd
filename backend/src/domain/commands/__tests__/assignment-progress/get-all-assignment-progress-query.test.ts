import { GetAllAssignmentProgressQuery } from 'src/domain/commands/assignment-progress/get-all-assignment-progress-query';
import { AssignmentProgress } from 'src/domain/entities/assignment-progress';
import { IAssignmentProgressRepository } from 'src/domain/repositories/assignment-progress-repository';
import { AssignmentProgressState } from 'src/domain/values/assignment-progress-state';
import { AssignmentId, AssignmentProgressId, ParticipantId } from 'src/domain/values/id';
import { AssignmentProgressStateValue } from 'src/util/enums';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetAllAssignmentProgressQuery UnitTest \n', () => {
  let query: GetAllAssignmentProgressQuery;
  let assignmentProgressRepository: IAssignmentProgressRepository;

  beforeEach(() => {
    assignmentProgressRepository = mock<IAssignmentProgressRepository>();
    query = new GetAllAssignmentProgressQuery(instance(assignmentProgressRepository));
  });

  it('- should get all assignment progress \n', async () => {
    // 準備
    const assignmentProgressId1 = AssignmentProgressId.create();
    const assignmentProgressId2 = AssignmentProgressId.create();
    const assignmentProgress1 = AssignmentProgress.restore(assignmentProgressId1, {
      assignmentId: AssignmentId.create(),
      participantId: ParticipantId.create(),
      assignmentProgressState: AssignmentProgressState.create(AssignmentProgressStateValue.NotStarted)
    });
    const assignmentProgress2 = AssignmentProgress.restore(assignmentProgressId2, {
      assignmentId: AssignmentId.create(),
      participantId: ParticipantId.create(),
      assignmentProgressState: AssignmentProgressState.create(AssignmentProgressStateValue.NotStarted)
    });
    const assignmentProgress: AssignmentProgress[] = [assignmentProgress1, assignmentProgress2];

    when(assignmentProgressRepository.getAll()).thenResolve(assignmentProgress);

    // 実行
    const result = await query.execute();

    // 確認
    expect(result).toEqual(assignmentProgress);
    verify(assignmentProgressRepository.getAll()).once();
  });
});
