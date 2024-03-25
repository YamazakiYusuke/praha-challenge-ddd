import { Inject, Injectable } from "@nestjs/common";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { ICommand } from "../base/command";

@Injectable()
export class SaveParticipantCommand implements ICommand<Participant> {
  constructor(
    @Inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(participant: Participant, transaction: any): Promise<void> {
    await this.participantRepository.save(participant, transaction);
  }
}
