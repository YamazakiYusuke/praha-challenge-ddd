import { Injectable } from "@nestjs/common";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { ICommand } from "../base/command";

@Injectable()
export class SaveAssignmentProgressCommand implements ICommand<AssignmentProgress> {
  constructor(private readonly assignmentProgressRepository: IAssignmentProgressRepository) { }

  async execute(assignmentProgress: AssignmentProgress): Promise<void | Error> {
    await this.assignmentProgressRepository.save(assignmentProgress);
  }
}
