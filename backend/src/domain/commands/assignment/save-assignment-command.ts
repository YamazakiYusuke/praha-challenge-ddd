import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";
import { inject, injectable } from "tsyringe";
import { ICommand } from "../base/command";

@injectable()
export class SaveAssignmentCommand implements ICommand<Assignment> {
  constructor(
    @inject('IAssignmentRepository')
    private readonly assignmentRepository: IAssignmentRepository
  ) { }

  async execute(assignment: Assignment, transaction?: any): Promise<void> {
    await this.assignmentRepository.save(assignment, transaction);
  }
}