import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { Participant, ParticipantProps } from "../../entities/participant";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { RepositoryError } from "../../errors/repository_error";
import { Injectable } from "@nestjs/common";
import { EntityModificationError } from "src/domain/errors/entity_modification_error";
import { Pair } from "src/domain/entities/pair";

@Injectable()
export class ParticipantChangeEnrollmentStatusToOnLeaveService {
  constructor() { }

  async execute(participant: Participant): Promise<Pair | EntityModificationError | RepositoryError> {
    const newEnrollment = EnrollmentStatusValue.OnLeave;
    participant.changeEnrollmentStatus(newEnrollment);
  }
}
