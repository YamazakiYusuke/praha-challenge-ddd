import { Injectable } from "@nestjs/common";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { Id } from "src/domain/values/id";
import { IGetOneQuery } from "../base/get-one-query";

@Injectable()
export class GetParticipantByIdQuery implements IGetOneQuery<Participant, Id> {
  constructor(private readonly participantRepository: IParticipantRepository) { }

  async execute(id: Id): Promise<Participant | null | Error> {
    const result = await this.participantRepository.getAll();
    const participants = result as Participant[];
    return participants.find((participant: Participant) => participant.getId.isEqual(id)) || null;
  }
}
