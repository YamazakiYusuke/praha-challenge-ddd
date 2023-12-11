import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaveParticipantCommand implements ICommand {
  constructor(private participant: Participant, private participantRepository: IParticipantRepository) {}

  async execute(): Promise<void | RepositoryError> {
    await this.participantRepository.save(this.participant);
  }
}
