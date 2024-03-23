import { Inject, Injectable } from "@nestjs/common";
import { Participant } from "src/domain/entities/participant";
import { ICommand } from "../base/command";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";

export interface ISaveParticipantCommand extends ICommand<Participant> {
  execute(participant: Participant, transaction: any): Promise<void | Error>;
}

@Injectable()
export class SaveParticipantCommand implements ISaveParticipantCommand {
  constructor(
    @Inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(participant: Participant, transaction: any): Promise<void | Error> {
    await this.participantRepository.save(participant, transaction);
  }
}
