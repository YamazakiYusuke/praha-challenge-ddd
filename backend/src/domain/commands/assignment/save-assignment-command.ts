import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";

export class SaveAssignmentCommand implements ICommand {
  constructor(private assignment: Assignment, private assignmentRepository: IAssignmentRepository) {}

  async execute(): Promise<void | RepositoryError> {
    await this.assignmentRepository.save(this.assignment);
  }
}