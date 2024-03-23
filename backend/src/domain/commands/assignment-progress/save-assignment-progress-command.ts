import { Inject, Injectable } from "@nestjs/common";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { ICommand } from "../base/command";

export interface ISaveAssignmentProgressCommand extends ICommand<AssignmentProgress> {
  execute(assignmentProgress: AssignmentProgress, transaction?: any): Promise<void>;
}

@Injectable()
export class SaveAssignmentProgressCommand implements ISaveAssignmentProgressCommand {
  constructor(
    @Inject('IAssignmentProgressRepository')
    private readonly assignmentProgressRepository: IAssignmentProgressRepository
  ) { }

  async execute(assignmentProgress: AssignmentProgress, transaction?: any): Promise<void> {
    await this.assignmentProgressRepository.save(assignmentProgress, transaction);
  }
}
