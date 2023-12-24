import { Injectable } from "@nestjs/common";
import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";
import { IGetAllQuery } from "../base/get-all-query";

@Injectable()
export class GetAllAssignmentsQuery implements IGetAllQuery<Assignment[]> {
  constructor(private readonly assignmentRepository: IAssignmentRepository) { }

  async execute(): Promise<Assignment[] | Error> {
    return await this.assignmentRepository.getAll();
  }
}
