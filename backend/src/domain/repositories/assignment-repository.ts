import { Participant } from "../entities/participant";
import { Assignment } from "../entities/assignment";

export interface IAssignmentRepository {
  save(assignment: Assignment): Promise<Assignment>
  getAll(): Promise<Participant[]>
}
