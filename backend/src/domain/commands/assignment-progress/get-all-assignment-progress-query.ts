import { Injectable } from "@nestjs/common";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetAllAssignmentProgressQuery implements IGetQuery<AssignmentProgress[]> {
  constructor(private readonly assignmentProgressRepository: IAssignmentProgressRepository) { }

  async execute(): Promise<AssignmentProgress[] | Error> {
    return await this.assignmentProgressRepository.getAll();
  }
}
