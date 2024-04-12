import { SaveAssignmentProgressCommand } from "src/domain/commands/assignment-progress/save-assignment-progress-command";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { AssignmentProgressStateValue } from "src/domain/util/enums";
import { inject, injectable } from "tsyringe";

@injectable()
export class ChangeAssignmentProgressService {
  constructor(
    @inject(SaveAssignmentProgressCommand)
    private readonly saveAssignmentProgressCommand: SaveAssignmentProgressCommand,
  ) { }

  async execute(assignmentProgress: AssignmentProgress, newState: AssignmentProgressStateValue): Promise<void> {
    assignmentProgress.changeAssignmentProgressState(newState);
    await this.saveAssignmentProgressCommand.execute(assignmentProgress);
  }
}