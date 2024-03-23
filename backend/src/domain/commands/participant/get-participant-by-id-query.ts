import { Inject, Injectable } from "@nestjs/common";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { ParticipantId } from "src/domain/values/id";
import { IGetQuery } from "../base/get-query";

export interface IGetParticipantByIdQuery extends IGetQuery<Participant, ParticipantId> {
  execute(id: ParticipantId): Promise<Participant | null>;
}

@Injectable()
export class GetParticipantByIdQuery implements IGetParticipantByIdQuery {
  constructor(
    @Inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(id: ParticipantId): Promise<Participant | null> {
    const result = await this.participantRepository.getAll();
    const participants = result as Participant[];
    return participants.find((participant: Participant) => participant.id.isEqual(id)) || null;
  }
}
