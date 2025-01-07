import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { AssignmentProgressId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetAssignmentProgressByIdQuery implements IGetQuery<AssignmentProgress, AssignmentProgressId> {
  constructor(
    @inject('IAssignmentProgressRepository')
    private readonly assignmentProgressRepository: IAssignmentProgressRepository
  ) { }

  async execute(assignmentProgressId: AssignmentProgressId): Promise<AssignmentProgress | null> {
    const result = await this.assignmentProgressRepository.getAll() as AssignmentProgress[];
    return result.find((element: AssignmentProgress) => element.id.isEqual(assignmentProgressId)) || null;
  }
}
