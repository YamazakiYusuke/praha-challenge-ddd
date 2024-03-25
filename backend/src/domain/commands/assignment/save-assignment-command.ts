import { Inject, Injectable } from "@nestjs/common";
import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";
import { ICommand } from "../base/command";

@Injectable()
export class SaveAssignmentCommand implements ICommand<Assignment> {
  constructor(
    @Inject('IAssignmentRepository')
    private readonly assignmentRepository: IAssignmentRepository
  ) { }

  async execute(assignment: Assignment, transaction?: any): Promise<void> {
    await this.assignmentRepository.save(assignment, transaction);
  }
}