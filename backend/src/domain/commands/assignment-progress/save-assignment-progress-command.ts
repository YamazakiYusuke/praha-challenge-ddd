import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaveAssignmentProgressCommand implements ICommand<AssignmentProgress> {
  constructor(private readonly assignmentProgressRepository: IAssignmentProgressRepository) { }

  async execute(assignmentProgress: AssignmentProgress): Promise<void | RepositoryError> {
    await this.assignmentProgressRepository.save(assignmentProgress);
  }
}
