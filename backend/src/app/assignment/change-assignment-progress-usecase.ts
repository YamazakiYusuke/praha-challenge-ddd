import { Inject, Injectable } from "@nestjs/common";
import { IChangeAssignmentProgressService } from "src/domain/services/assignment/change-assignment-progress-service";
import { AssignmentProgressState } from "src/domain/values/assignment-progress-state";
import { AssignmentProgressId } from "src/domain/values/id";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";
import { SuccessResponse } from "../responses/success-response";

@Injectable()
export class ChangeAssignmentProgressUsecase {
  constructor(
    @Inject('IChangeAssignmentProgressService')
    private readonly changeAssignmentProgressService: IChangeAssignmentProgressService,
  ) { }

  public async execute(assignmentProgressId: AssignmentProgressId, newState: AssignmentProgressState): Promise<SuccessResponse | ErrorResponse> {
    try {
      await this.changeAssignmentProgressService.execute(assignmentProgressId, newState);
      return new SuccessResponse('課題のステータスの変更に成功しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('課題のステータスの変更に失敗しました');
    }
  }
}
