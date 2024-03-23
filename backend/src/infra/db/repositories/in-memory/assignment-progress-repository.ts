import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";

export class InMemoryAssignmentProgressRepository implements IAssignmentProgressRepository {
  private assignmentProgresses: AssignmentProgress[] = [];

  async save(assignmentProgress: AssignmentProgress): Promise<void> {
    this.assignmentProgresses.push(assignmentProgress);
    return;
  }

  async getAll(): Promise<AssignmentProgress[]> {
    return this.assignmentProgresses;
  }
}
