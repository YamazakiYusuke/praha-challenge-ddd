import { Injectable } from "@nestjs/common";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { ParticipantId } from "src/domain/values/id";
import { IGetOneQuery } from "../base/get-one-query";

@Injectable()
export class GetParticipantByIdQuery implements IGetOneQuery<Participant, ParticipantId> {
  constructor(private readonly participantRepository: IParticipantRepository) { }

  async execute(id: ParticipantId): Promise<Participant | null | Error> {
    const result = await this.participantRepository.getAll();
    const participants = result as Participant[];
    return participants.find((participant: Participant) => participant.getId.isEqual(id)) || null;
  }
}
