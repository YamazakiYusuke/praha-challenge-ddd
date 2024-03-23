import { Inject, Injectable } from "@nestjs/common";
import { IGetAssignmentProgressByIdQuery } from "src/domain/commands/assignment-progress/get-assignment-progress-by-id-query";
import { ISaveAssignmentProgressCommand } from "src/domain/commands/assignment-progress/save-assignment-progress-command";
import { EntityError } from "src/domain/errors/entity_error";
import { AssignmentProgressState } from "src/domain/values/assignment-progress-state";
import { AssignmentProgressId } from "src/domain/values/id";

export interface IChangeAssignmentProgressService {
  execute(assignmentProgressId: AssignmentProgressId, newState: AssignmentProgressState): Promise<void>;
}

@Injectable()
export class ChangeAssignmentProgressService implements IChangeAssignmentProgressService {
  constructor(
    @Inject('IGetAssignmentProgressByIdQuery')
    private readonly getAssignmentProgressByIdQuery: IGetAssignmentProgressByIdQuery,
    @Inject('ISaveAssignmentProgressCommand')
    private readonly saveAssignmentProgressCommand: ISaveAssignmentProgressCommand,
  ) { }

  async execute(assignmentProgressId: AssignmentProgressId, newState: AssignmentProgressState): Promise<void> {
    const assignmentProgress = await this.getAssignmentProgressByIdQuery.execute(assignmentProgressId);
    if (!assignmentProgress) {
      throw new EntityError(`AssignmentProgress ${assignmentProgressId} が存在しません`);
    }
    assignmentProgress.changeAssignmentProgressState(newState);
    await this.saveAssignmentProgressCommand.execute(assignmentProgress);
  }
}