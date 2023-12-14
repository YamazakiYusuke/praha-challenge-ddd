import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { Participant, ParticipantProps } from "../../entities/participant";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { RepositoryError } from "../../errors/repository_error";
import { Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";

@Injectable()
export class ParticipantChangeEnrollmentStatusToWithDrawnService {
  constructor() { }

  async execute(participant: Participant): Promise<Pair | EntityCreationError | RepositoryError> {
    const modifiedParticipant = participant.changeEnrollmentStatus(newEnrollment);
  }
}
