import { Assignment } from "../entities/assignment";

export interface IAssignmentRepository {
  save(assignment: Assignment): Promise<Assignment | RepositoryError>
  getAll(): Promise<Assignment[] | RepositoryError>
}
