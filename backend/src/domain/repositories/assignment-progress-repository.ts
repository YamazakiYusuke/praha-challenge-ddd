import { AssignmentProgress } from "../entities/assignment-progress";
import { RepositoryError } from "../errors/repository_error";

export interface IAssignmentProgressRepository {
  save(assignmentProgress: AssignmentProgress, transaction?: any): Promise<void | Error>
  getAll(): Promise<AssignmentProgress[] | RepositoryError>
}
