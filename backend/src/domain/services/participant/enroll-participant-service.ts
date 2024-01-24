import { Inject, Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { Participants } from "src/domain/entities/participants";
import { ICreatePairService } from "src/domain/services/pair/create-pair-service";

export interface IEnrollParticipantService {
  execute(smallestPair: Pair, participant: Participant): Promise<Pair[] | Error>;
}

@Injectable()
export class EnrollParticipantService implements IEnrollParticipantService {
  constructor(
    @Inject('ICreatePairService')
    private readonly createPairService: ICreatePairService,
  ) { }

  async execute(smallestPair: Pair, participant: Participant): Promise<Pair[] | Error> {
    if (smallestPair.participantsLength < 3) {
      smallestPair.appendParticipant(participant);
      return [smallestPair];
    } else {
      const mover = smallestPair.lastParticipant;
      smallestPair.removeParticipant(mover);
      const newParticipants = Participants.create([mover, participant]) as Participants;
      const enrolledPair = await this.createPairService.execute({ teamId: smallestPair.teamId, participants: newParticipants }) as Pair;
      return [smallestPair, enrolledPair];
    }
  }
}