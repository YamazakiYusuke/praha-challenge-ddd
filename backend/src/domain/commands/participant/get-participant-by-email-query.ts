import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { Email } from "src/domain/values/email";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetParticipantByEmailQuery implements IGetQuery<Participant, Email> {
  constructor(
    @inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(email: Email): Promise<Participant | null> {
    const participants = await this.participantRepository.getAll();
    return participants.find(participant => participant.email.isEqual(email)) || null;
  }
}
