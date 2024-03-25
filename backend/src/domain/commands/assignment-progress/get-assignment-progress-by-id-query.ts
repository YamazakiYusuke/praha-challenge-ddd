import { Inject, Injectable } from "@nestjs/common";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { AssignmentProgressId } from "src/domain/values/id";
import { IGetQuery } from "../base/get-query";

export interface IGetAssignmentProgressByIdQuery extends IGetQuery<AssignmentProgress, AssignmentProgressId> {
  execute(assignmentProgressId: AssignmentProgressId): Promise<AssignmentProgress | null>;
}

@Injectable()
export class GetAssignmentProgressByIdQuery implements IGetQuery<AssignmentProgress, AssignmentProgressId> {
  constructor(
    @Inject('IAssignmentProgressRepository')
    private readonly assignmentProgressRepository: IAssignmentProgressRepository
  ) { }

  async execute(assignmentProgressId: AssignmentProgressId): Promise<AssignmentProgress | null> {
    const result = await this.assignmentProgressRepository.getAll() as AssignmentProgress[];
    return result.find((element: AssignmentProgress) => element.id.isEqual(assignmentProgressId)) || null;
  }
}
