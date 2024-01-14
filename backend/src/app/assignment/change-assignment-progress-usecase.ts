import { GetAssignmentProgressByIdQuery } from "src/domain/commands/assignment-progress/get-assignment-progress-by-id-query";
import { SaveAssignmentProgressCommand } from "src/domain/commands/assignment-progress/save-assignment-progress-command";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { UsecaseError } from "src/domain/errors/usecase_error";
import { AssignmentProgressState } from "src/domain/values/assignment-progress-state";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";
import { SuccessResponse } from "../responses/success-response";
import { AssignmentProgressStateValue } from "src/util/enums";
import { AssignmentProgressId } from "src/domain/values/id";

export class ChangeAssignmentProgressUsecase {
  constructor(
    private readonly getAssignmentProgressByIdQuery: GetAssignmentProgressByIdQuery,
    private readonly savAssignmentProgressCommand: SaveAssignmentProgressCommand,
  ) { }

  public async execute(assignmentProgressId: AssignmentProgressId, newStateStr: AssignmentProgressStateValue): Promise<SuccessResponse | ErrorResponse> {
    try {
      const assignmentProgress = await this.getAssignmentProgressByIdQuery.execute(assignmentProgressId) as AssignmentProgress | null;
      if (assignmentProgress == null) throw new UsecaseError(`AssignmentProgress${assignmentProgressId}が存在しません`);
      const newState = AssignmentProgressState.create(newStateStr) as AssignmentProgressState;
      assignmentProgress.changeAssignmentProgressState(newState);
      await this.savAssignmentProgressCommand.execute(assignmentProgress);
      return new SuccessResponse('課題のステータスの変更に成功しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('課題のステータスの変更に失敗しました');
    }
  }
}
