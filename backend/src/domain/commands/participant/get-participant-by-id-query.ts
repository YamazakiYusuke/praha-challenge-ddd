import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { ParticipantId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetParticipantByIdQuery implements IGetQuery<Participant, ParticipantId> {
  constructor(
    @inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(id: ParticipantId): Promise<Participant | null> {
    const participants = await this.participantRepository.getAll();
    return participants.find(participant => participant.id.isEqual(id)) || null;
  }
}
