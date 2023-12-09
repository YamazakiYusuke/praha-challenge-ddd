import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { IGetAllQuery } from "../base/get-all-query";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllAssignmentsQuery implements IGetAllQuery<Assignment[]> {
  constructor(private assignmentRepository: IAssignmentRepository) { }

  async execute(): Promise<Assignment[] | RepositoryError> {
    return await this.assignmentRepository.getAll();
  }
}
