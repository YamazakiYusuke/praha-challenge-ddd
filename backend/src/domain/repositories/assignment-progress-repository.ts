import { AssignmentProgress } from "../entities/assignment-progress";
import { RepositoryError } from "../errors/repository_error";

export interface IAssignmentProgressRepository {
  save(assignmentProgress: AssignmentProgress): Promise<void | RepositoryError>
  getAll(): Promise<AssignmentProgress[] | RepositoryError>
}
