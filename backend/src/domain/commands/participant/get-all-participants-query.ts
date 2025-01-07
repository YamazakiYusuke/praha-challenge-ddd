import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetAllParticipantsQuery implements IGetQuery<Participant[]> {
  constructor(
    @inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(): Promise<Participant[]> {
    return await this.participantRepository.getAll();
  }
}
