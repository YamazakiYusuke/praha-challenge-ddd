import { Assignment } from "../entities/assignment";

export interface IAssignmentRepository {
  save(assignment: Assignment, transaction?: any): Promise<void | Error>
  getAll(): Promise<Assignment[] | Error>
}
