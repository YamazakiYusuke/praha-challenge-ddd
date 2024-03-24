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
    const participants = await this.participantRepository.getAll();
    return participants.find(participant => participant.id.isEqual(id)) || null;
  }
}
