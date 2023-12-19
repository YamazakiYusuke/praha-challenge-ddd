import { Participant } from "../entities/participant";
import { RepositoryError } from "../errors/repository_error";

export interface IParticipantRepository {
  getAll(): Promise<Participant[] | RepositoryError>
  save(participant: Participant): Promise<Participant | RepositoryError>
}

