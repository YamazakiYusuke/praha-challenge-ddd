import { Inject, Injectable } from "@nestjs/common";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository } from "src/domain/repositories/participant-repository";
import { TeamId } from "src/domain/values/id";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetParticipantsByTeamIdQuery implements IGetQuery<Participant[], TeamId> {
  constructor(
    @Inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(teamId: TeamId): Promise<Participant[] | null> {
    const participants = await this.participantRepository.getAll();
    return participants.filter(participant => participant.teamId?.isEqual(teamId)) || null;
  }
}
