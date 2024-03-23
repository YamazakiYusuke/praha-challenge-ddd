import { Inject, Injectable } from "@nestjs/common";
import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";
import { IGetQuery } from "../base/get-query";

export interface IGetAllAssignmentsQuery extends IGetQuery<Assignment[]> {
  execute(): Promise<Assignment[]>;
}

@Injectable()
export class GetAllAssignmentsQuery implements IGetAllAssignmentsQuery {
  constructor(
    @Inject('IAssignmentRepository')
    private readonly assignmentRepository: IAssignmentRepository
  ) { }

  async execute(): Promise<Assignment[]> {
    return await this.assignmentRepository.getAll();
  }
}
