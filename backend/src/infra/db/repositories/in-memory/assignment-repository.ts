import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";

export class InMemoryAssignmentRepository implements IAssignmentRepository {
  private assignments: Assignment[] = [];

  async save(assignment: Assignment): Promise<void> {
    this.assignments.push(assignment);
    return;
  }

  async getAll(): Promise<Assignment[]> {
    return this.assignments;
  }
}
