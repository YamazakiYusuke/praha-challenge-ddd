import { AssignmentProgress } from "../entities/assignment-progress";

export interface IAssignmentProgressRepository {
  save(assignmentProgress: AssignmentProgress, transaction?: any): Promise<void>
  getAll(): Promise<AssignmentProgress[]>
}
