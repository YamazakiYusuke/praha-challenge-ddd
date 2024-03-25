import { Inject, Injectable } from "@nestjs/common";
import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetAllAssignmentsQuery implements IGetQuery<Assignment[]> {
  constructor(
    @Inject('IAssignmentRepository')
    private readonly assignmentRepository: IAssignmentRepository
  ) { }

  async execute(): Promise<Assignment[]> {
    return await this.assignmentRepository.getAll();
  }
}
