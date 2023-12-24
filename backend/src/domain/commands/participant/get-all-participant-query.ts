import { Injectable } from "@nestjs/common";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { IGetAllQuery } from "../base/get-all-query";

@Injectable()
export class GetAllParticipantsQuery implements IGetAllQuery<Participant[]> {
  constructor(private readonly participantRepository: IParticipantRepository) { }

  async execute(): Promise<Participant[] | Error> {
    return await this.participantRepository.getAll();
  }
}
