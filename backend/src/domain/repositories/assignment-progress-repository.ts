import { AssignmentProgress } from "../entities/assignment-progress";

export interface IAssignmentProgressRepository {
  save(assignmentProgress: AssignmentProgress): Promise<AssignmentProgress>
  getAll(): Promise<AssignmentProgress[]>
}
