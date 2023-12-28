import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";

export class InMemoryParticipantRepository implements IParticipantRepository {
  private participants: Participant[] = [];

  async save(participant: Participant): Promise<void | Error> {
    this.participants.push(participant);
    return;
  }

  async getAll(): Promise<Participant[] | Error> {
    return this.participants;
  }
}
