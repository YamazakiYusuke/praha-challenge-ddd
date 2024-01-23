import { Injectable, Inject } from "@nestjs/common";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { Email } from "src/domain/values/email";
import { IGetQuery } from "../base/get-query";

export interface IGetParticipantByEmailQuery extends IGetQuery<Participant, Email> {
  execute(email: Email): Promise<Participant | null | Error>;
}

@Injectable()
export class GetParticipantByEmailQuery implements IGetParticipantByEmailQuery {
  constructor(
    @Inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(email: Email): Promise<Participant | null | Error> {
    const result = await this.participantRepository.getAll();
    const participants = result as Participant[];
    return participants.find((participant: Participant) => participant.email.isEqual(email)) || null;
  }
}
