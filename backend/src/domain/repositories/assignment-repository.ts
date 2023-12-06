import { Assignment } from "../entities/assignment";
import { RepositoryError } from "../errors/repository_error";

export interface IAssignmentRepository {
  save(assignment: Assignment): Promise<Assignment | RepositoryError>
  getAll(): Promise<Assignment[] | RepositoryError>
}
