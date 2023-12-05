import { AssignmentProgress } from "../entities/assignment-progress";

export interface IAssignmentProgressRepository {
  save(assignmentProgress: AssignmentProgress): Promise<AssignmentProgress | RepositoryError>
  getAll(): Promise<AssignmentProgress[] | RepositoryError>
}
