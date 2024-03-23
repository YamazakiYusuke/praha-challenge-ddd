import { Inject, Injectable } from "@nestjs/common";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { IGetQuery } from "../base/get-query";

export interface IGetAllParticipantsQuery extends IGetQuery<Participant[]> {
  execute(): Promise<Participant[]>;
}

@Injectable()
export class GetAllParticipantsQuery implements IGetAllParticipantsQuery {
  constructor(
    @Inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(): Promise<Participant[]> {
    return await this.participantRepository.getAll();
  }
}
