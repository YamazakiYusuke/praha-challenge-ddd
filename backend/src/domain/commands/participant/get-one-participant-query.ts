import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { IGetOneQuery } from "../base/get-one-query";
import { Injectable } from "@nestjs/common";
import { Email } from "src/domain/values/email";

@Injectable()
export class GetOneParticipantQuery implements IGetOneQuery<Participant, Email> {
  constructor(private participantRepository: IParticipantRepository) { }

  async execute(email: Email): Promise<Participant | null | RepositoryError> {
    return await this.participantRepository.get(email);
  }
}
