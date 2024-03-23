import { Inject, Injectable } from "@nestjs/common";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { ICommand } from "../base/command";

export interface ISaveParticipantCommand extends ICommand<Participant> {
  execute(participant: Participant, transaction?: any): Promise<void>;
}

@Injectable()
export class SaveParticipantCommand implements ISaveParticipantCommand {
  constructor(
    @Inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(participant: Participant, transaction: any): Promise<void> {
    await this.participantRepository.save(participant, transaction);
  }
}
