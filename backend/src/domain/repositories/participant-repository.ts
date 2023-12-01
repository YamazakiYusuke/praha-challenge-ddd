import { Participant } from "../entities/participant";

export interface IParticipantRepository {
  save(someData: Participant): Promise<Participant>
}
