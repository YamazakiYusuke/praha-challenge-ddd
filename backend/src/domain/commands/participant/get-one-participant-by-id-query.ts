import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { IGetOneQuery } from "../base/get-one-query";
import { Injectable } from "@nestjs/common";
import { Email } from "src/domain/values/email";
import { Id } from "src/domain/values/id";

@Injectable()
export class GetOneParticipantByIdQuery implements IGetOneQuery<Participant, Id> {
  constructor(private readonly participantRepository: IParticipantRepository) { }

  async execute(id: Id): Promise<Participant | null | RepositoryError> {
    const result = await this.participantRepository.getAll();
    const participants = result as Participant[];
    return participants.find((participant: Participant) => participant.getId.isEqual(id)) || null;
  }
}
