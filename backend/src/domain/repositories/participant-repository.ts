import { Participant } from "../entities/participant";
import { Email } from "../values/email";

export interface IParticipantRepository {
  save(participant: Participant): Promise<Participant>
  get(email: Email): Promise<Participant>
  getAll(): Promise<Participant[]>
}
