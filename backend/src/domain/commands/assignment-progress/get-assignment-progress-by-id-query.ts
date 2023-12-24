import { Injectable } from "@nestjs/common";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { IGetOneQuery } from "../base/get-one-query";

@Injectable()
export class GetAssignmentProgressByIdQuery implements IGetOneQuery<AssignmentProgress, string> {
  constructor(private readonly assignmentProgressRepository: IAssignmentProgressRepository) { }

  async execute(assignmentProgressId: string): Promise<AssignmentProgress | null | Error> {
    const result = await this.assignmentProgressRepository.getAll() as AssignmentProgress[];
    return result.find((element: AssignmentProgress) => element.getId.isEqual(assignmentProgressId)) || null;
  }
}
