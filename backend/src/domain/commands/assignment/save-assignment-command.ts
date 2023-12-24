import { Injectable } from "@nestjs/common";
import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";
import { ICommand } from "../base/command";

@Injectable()
export class SaveAssignmentCommand implements ICommand<Assignment> {
  constructor(private readonly assignmentRepository: IAssignmentRepository) { }

  async execute(assignment: Assignment): Promise<void | Error> {
    await this.assignmentRepository.save(assignment);
  }
}