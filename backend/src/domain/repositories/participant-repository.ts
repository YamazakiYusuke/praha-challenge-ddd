import { Participant } from "../entities/participant";
import { RepositoryError } from "../errors/repository_error";
import { Email } from "../values/email";

export interface IParticipantRepository {
  getAll(): Promise<Participant[] | RepositoryError>
}

