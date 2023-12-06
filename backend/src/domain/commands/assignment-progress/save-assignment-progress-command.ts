import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";

export class SaveAssignmentProgressCommand implements ICommand {
  constructor(private assignmentProgress: AssignmentProgress, private assignmentProgressRepository: IAssignmentProgressRepository) {}

  async execute(): Promise<void | RepositoryError> {
    await this.assignmentProgressRepository.save(this.assignmentProgress);
  }
}
