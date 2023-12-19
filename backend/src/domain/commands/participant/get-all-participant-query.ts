import { IGetAllQuery } from "../base/get-all-query";
import { Injectable } from "@nestjs/common";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { RepositoryError } from "src/domain/errors/repository_error";

@Injectable()
export class GetAllParticipantsQuery implements IGetAllQuery<Participant[]> {
  constructor(private readonly participantRepository: IParticipantRepository) { }

  async execute(): Promise<Participant[] | RepositoryError> {
    return await this.participantRepository.getAll();
  }
}
