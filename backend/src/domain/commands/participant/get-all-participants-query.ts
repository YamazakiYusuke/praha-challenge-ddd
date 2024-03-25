import { Inject, Injectable } from "@nestjs/common";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetAllParticipantsQuery implements IGetQuery<Participant[]> {
  constructor(
    @Inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(): Promise<Participant[]> {
    return await this.participantRepository.getAll();
  }
}
