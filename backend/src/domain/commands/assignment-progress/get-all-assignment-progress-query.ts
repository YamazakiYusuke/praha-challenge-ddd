import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetAllAssignmentProgressQuery implements IGetQuery<AssignmentProgress[]> {
  constructor(
    @inject('IAssignmentProgressRepository')
    private readonly assignmentProgressRepository: IAssignmentProgressRepository
  ) { }

  async execute(): Promise<AssignmentProgress[]> {
    return await this.assignmentProgressRepository.getAll();
  }
}
