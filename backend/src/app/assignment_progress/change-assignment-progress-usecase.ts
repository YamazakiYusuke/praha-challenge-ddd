import { AssignmentProgressDto } from "src/app/assignment_progress/dto/assignment_progress_dto";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { ChangeAssignmentProgressService } from "src/domain/services/assignment_progress/change-assignment-progress-service";
import { AssignmentId, AssignmentProgressId, ParticipantId } from "src/domain/values/ids";
import { AssignmentProgressStateValue } from "src/util/enums";
import { inject, injectable } from "tsyringe";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";
import { SuccessResponse } from "../responses/success-response";

@injectable()
export class ChangeAssignmentProgressUsecase {
  constructor(
    @inject(ChangeAssignmentProgressService)
    private readonly changeAssignmentProgressService: ChangeAssignmentProgressService,
  ) { }

  public async execute({ assignmentProgressDto, newState }: { assignmentProgressDto: AssignmentProgressDto, newState: AssignmentProgressStateValue }): Promise<SuccessResponse | ErrorResponse> {
    try {
      const assignmentProgressId = AssignmentProgressId.restore(assignmentProgressDto.id);
      const assignmentId = AssignmentId.restore(assignmentProgressDto.assignmentId);
      const participantId = ParticipantId.restore(assignmentProgressDto.participantId);
      const assignmentProgressState = assignmentProgressDto.assignmentProgressState;

      const assignmentProgress = AssignmentProgress.restore(assignmentProgressId, {
        assignmentId,
        participantId,
        assignmentProgressState,
      });
      await this.changeAssignmentProgressService.execute(assignmentProgress, newState);
      return new SuccessResponse('課題のステータスの変更に成功しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('課題のステータスの変更に失敗しました');
    }
  }
}
