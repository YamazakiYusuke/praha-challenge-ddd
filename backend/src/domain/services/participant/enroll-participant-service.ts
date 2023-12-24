import { Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { Participants } from "src/domain/entities/participants";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";

@Injectable()
export class EnrollParticipantService {
  constructor(
    private readonly createPairService: CreatePairService,
  ) { }

  async execute(smallestPair: Pair, participant: Participant): Promise<Pair[] | Error> {
    if (smallestPair.participantsLength < 3) {
      smallestPair.appendParticipant(participant);
      return [smallestPair];
    } else {
      const mover = smallestPair.lastParticipant;
      smallestPair.removeParticipant(mover);
      const newParticipants = Participants.create([mover, participant]) as Participants;
      const enrolledPair = await (this.createPairService.execute({ teamId: smallestPair.teamId, participants: newParticipants })) as Pair;
      return [smallestPair, enrolledPair];
    }
  }
}