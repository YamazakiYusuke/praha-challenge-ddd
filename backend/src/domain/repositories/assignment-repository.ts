import { Assignment } from "../entities/assignment";
import { RepositoryError } from "../errors/repository_error";

export interface IAssignmentRepository {
  save(assignment: Assignment): Promise<void | RepositoryError>
  getAll(): Promise<Assignment[] | RepositoryError>
}
