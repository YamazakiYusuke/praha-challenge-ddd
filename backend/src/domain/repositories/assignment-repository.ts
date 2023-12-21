import { Assignment } from "../entities/assignment";

export interface IAssignmentRepository {
  save(assignment: Assignment): Promise<void | Error>
  getAll(): Promise<Assignment[] | Error>
}
