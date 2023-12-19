import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaveAssignmentCommand implements ICommand<Assignment> {
  constructor(private readonly assignmentRepository: IAssignmentRepository) {}

  async execute(assignment: Assignment): Promise<void | RepositoryError> {
    await this.assignmentRepository.save(assignment);
  }
}