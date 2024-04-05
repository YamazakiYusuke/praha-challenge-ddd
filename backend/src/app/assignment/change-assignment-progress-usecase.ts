import { ChangeAssignmentProgressService } from "src/domain/services/assignment/change-assignment-progress-service";
import { AssignmentProgressId } from "src/domain/values/id";
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

  public async execute(assignmentProgressId: AssignmentProgressId, newState: AssignmentProgressStateValue): Promise<SuccessResponse | ErrorResponse> {
    try {
      await this.changeAssignmentProgressService.execute(assignmentProgressId, newState);
      return new SuccessResponse('課題のステータスの変更に成功しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('課題のステータスの変更に失敗しました');
    }
  }
}
