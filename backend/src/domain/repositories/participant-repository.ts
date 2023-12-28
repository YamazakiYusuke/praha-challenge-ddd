import { Participant } from "../entities/participant";

export interface IParticipantRepository {
  getAll(): Promise<Participant[] | Error>
  save(participant: Participant): Promise<void | Error>
}

