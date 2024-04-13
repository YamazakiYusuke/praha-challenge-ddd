import { AssignmentProgressDto } from "src/app/assignment-progress/dto/assignment-progress-dto";
import { ExpectedErrorResponse, SuccessResponse, UnExpectedErrorResponse, UsecaseResponse } from "src/app/responses/usecase-responses";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { BaseError } from "src/domain/errors/base/base_error";
import { ChangeAssignmentProgressService } from "src/domain/services/assignment_progress/change-assignment-progress-service";
import { AssignmentProgressStateValue } from "src/domain/util/enums";
import { AssignmentId, AssignmentProgressId, ParticipantId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";

@injectable()
export class ChangeAssignmentProgressUsecase {
  constructor(
    @inject(ChangeAssignmentProgressService)
    private readonly changeAssignmentProgressService: ChangeAssignmentProgressService,
  ) { }

  public async execute({ assignmentProgressDto, newState }: { assignmentProgressDto: AssignmentProgressDto, newState: AssignmentProgressStateValue }): Promise<UsecaseResponse> {
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
      return new SuccessResponse(null);
    } catch (e: any) {
      if (e instanceof BaseError) {
        return new ExpectedErrorResponse();
      } else {
        return new UnExpectedErrorResponse();
      }
    }
  }
}

