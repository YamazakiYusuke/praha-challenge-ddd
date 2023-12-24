import { Injectable } from "@nestjs/common";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { IGetAllQuery } from "../base/get-all-query";

@Injectable()
export class GetAllAssignmentProgressQuery implements IGetAllQuery<AssignmentProgress[]> {
  constructor(private readonly assignmentProgressRepository: IAssignmentProgressRepository) { }

  async execute(): Promise<AssignmentProgress[] | Error> {
    return await this.assignmentProgressRepository.getAll();
  }
}
