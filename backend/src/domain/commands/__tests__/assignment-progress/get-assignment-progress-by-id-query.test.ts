import { GetAssignmentProgressByIdQuery } from 'src/domain/commands/assignment-progress/get-assignment-progress-by-id-query';
import { AssignmentProgress } from 'src/domain/entities/assignment-progress';
import { IAssignmentProgressRepository } from 'src/domain/repositories/assignment-progress-repository';
import { AssignmentId, AssignmentProgressId, ParticipantId } from 'src/domain/values/ids';
import { AssignmentProgressStateValue } from 'src/util/enums';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetAssignmentProgressByIdQuery UnitTest \n', () => {
  let query: GetAssignmentProgressByIdQuery;
  let assignmentProgressRepository: IAssignmentProgressRepository;

  beforeEach(() => {
    assignmentProgressRepository = mock<IAssignmentProgressRepository>();
    query = new GetAssignmentProgressByIdQuery(instance(assignmentProgressRepository));
  });

  it('- should get assignment progress by id \n', async () => {
    // 準備
    const assignmentProgressId = AssignmentProgressId.create();
    const assignmentProgress = AssignmentProgress.restore(assignmentProgressId, {
      assignmentId: AssignmentId.create(),
      participantId: ParticipantId.create(),
      assignmentProgressState: AssignmentProgressStateValue.NotStarted
    });

    when(assignmentProgressRepository.getAll()).thenResolve([assignmentProgress]);

    // 実行
    const result = await query.execute(assignmentProgressId);

    // 確認
    expect(result).toEqual(assignmentProgress);
    verify(assignmentProgressRepository.getAll()).once();
  });
});
