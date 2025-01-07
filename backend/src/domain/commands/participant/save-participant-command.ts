import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { inject, injectable } from "tsyringe";
import { ICommand } from "../base/command";

@injectable()
export class SaveParticipantCommand implements ICommand<Participant> {
  constructor(
    @inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(participant: Participant, transaction?: any): Promise<void> {
    await this.participantRepository.save(participant, transaction);
  }
}
