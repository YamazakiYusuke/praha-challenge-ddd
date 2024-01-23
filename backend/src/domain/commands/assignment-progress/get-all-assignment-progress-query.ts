import { Inject, Injectable } from "@nestjs/common";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { IGetQuery } from "../base/get-query";

export interface IGetAllAssignmentProgressQuery extends IGetQuery<AssignmentProgress[]> {
  execute(): Promise<AssignmentProgress[] | Error>;
}

@Injectable()
export class GetAllAssignmentProgressQuery implements IGetAllAssignmentProgressQuery {
  constructor(
    @Inject('IAssignmentProgressRepository')
    private readonly assignmentProgressRepository: IAssignmentProgressRepository
  ) { }

  async execute(): Promise<AssignmentProgress[] | Error> {
    return await this.assignmentProgressRepository.getAll();
  }
}
