import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetAllAssignmentsQuery implements IGetQuery<Assignment[]> {
  constructor(
    @inject('IAssignmentRepository')
    private readonly assignmentRepository: IAssignmentRepository
  ) { }

  async execute(): Promise<Assignment[]> {
    return await this.assignmentRepository.getAll();
  }
}
