import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { inject, injectable } from "tsyringe";
import { ICommand } from "../base/command";

@injectable()
export class SaveAssignmentProgressCommand implements ICommand<AssignmentProgress> {
  constructor(
    @inject('IAssignmentProgressRepository')
    private readonly assignmentProgressRepository: IAssignmentProgressRepository
  ) { }

  async execute(assignmentProgress: AssignmentProgress, transaction?: any): Promise<void> {
    await this.assignmentProgressRepository.save(assignmentProgress, transaction);
  }
}
