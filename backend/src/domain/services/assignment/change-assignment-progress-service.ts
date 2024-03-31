import { GetAssignmentProgressByIdQuery } from "src/domain/commands/assignment-progress/get-assignment-progress-by-id-query";
import { SaveAssignmentProgressCommand } from "src/domain/commands/assignment-progress/save-assignment-progress-command";
import { EntityError } from "src/domain/errors/entity_error";
import { AssignmentProgressState } from "src/domain/values/assignment-progress-state";
import { AssignmentProgressId } from "src/domain/values/id";
import { inject, injectable } from "tsyringe";

@injectable()
export class ChangeAssignmentProgressService {
  constructor(
    @inject(GetAssignmentProgressByIdQuery) 
    private readonly getAssignmentProgressByIdQuery: GetAssignmentProgressByIdQuery,
    @inject(SaveAssignmentProgressCommand) 
    private readonly saveAssignmentProgressCommand: SaveAssignmentProgressCommand,
  ) { }

  async execute(assignmentProgressId: AssignmentProgressId, newState: AssignmentProgressState): Promise<void> {
    const assignmentProgress = await this.getAssignmentProgressByIdQuery.execute(assignmentProgressId);
    if (!assignmentProgress) {
      throw new EntityError(`AssignmentProgress ${assignmentProgressId} が存在しません`);
    }
    assignmentProgress.changeAssignmentProgressState(newState);
    await this.saveAssignmentProgressCommand.execute(assignmentProgress);
  }
}