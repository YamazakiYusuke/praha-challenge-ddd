import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseErrorResponse, UsecaseSuccessResponse } from "src/app/responses/usecase-responses";
import { GetAssignmentProgressByIdQuery } from "src/domain/commands/assignment-progress/get-assignment-progress-by-id-query";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { BaseError } from "src/domain/errors/base/base_error";
import { ChangeAssignmentProgressService } from "src/domain/services/assignment_progress/change-assignment-progress-service";
import { AssignmentProgressStateValue } from "src/domain/util/enums";
import { AssignmentProgressId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";

@injectable()
export class ChangeAssignmentProgressUsecase {
  constructor(
    @inject(ChangeAssignmentProgressService)
    private readonly changeAssignmentProgressService: ChangeAssignmentProgressService,
    @inject(GetAssignmentProgressByIdQuery)
    private readonly getAssignmentProgressByIdQuery: GetAssignmentProgressByIdQuery
  ) { }

  public async execute({ assignmentProgressStringId, newState }: { assignmentProgressStringId: string, newState: AssignmentProgressStateValue }): Promise<UsecaseSuccessResponse<null> | UsecaseErrorResponse> {
    try {
      const assignmentProgressId = AssignmentProgressId.restore(assignmentProgressStringId);
      const assignmentProgress = await this.getAssignmentProgressByIdQuery.execute(assignmentProgressId);
      if (assignmentProgress == null) {
        console.log("idが存在しません")
        return new ExpectedErrorResponse();
      }

      await this.changeAssignmentProgressService.execute(assignmentProgress, newState);
      return new UsecaseSuccessResponse(null);
    } catch (e: any) {
      console.error('ChangeAssignmentProgressUsecase:', e);
      if (e instanceof BaseError) {
        return new ExpectedErrorResponse();
      } else {
        return new UnExpectedErrorResponse();
      }
    }
  }
}

