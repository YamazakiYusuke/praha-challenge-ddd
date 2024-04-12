import { AssignmentProgressDto } from "src/app/assignment-progress/dto/assignment-progress-dto";
import { isExpectedError } from "src/app/util/is-expected-error";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { ChangeAssignmentProgressService } from "src/domain/services/assignment_progress/change-assignment-progress-service";
import { AssignmentProgressStateValue } from "src/domain/util/enums";
import { AssignmentId, AssignmentProgressId, ParticipantId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";
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
    } catch (e: any) {
      if (isExpectedError(e)) {
        return new ErrorResponse(400, `課題のステータスの変更に失敗しました。${e.name}:${e.message}`);
      } else {
        return new ErrorResponse(500, '課題のステータスの変更に失敗しました。');
      }
    }
  }
}

