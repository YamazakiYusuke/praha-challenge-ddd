import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { IGetAllQuery } from "../base/get-all-query";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllAssignmentProgressQuery implements IGetAllQuery<AssignmentProgress[]> {
  constructor(private readonly assignmentProgressRepository: IAssignmentProgressRepository) { }

  async execute(): Promise<AssignmentProgress[] | RepositoryError> {
    return await this.assignmentProgressRepository.getAll();
  }
}
