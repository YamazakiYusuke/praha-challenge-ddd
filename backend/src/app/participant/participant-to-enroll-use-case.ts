import { Injectable } from "@nestjs/common";
import { GetOneLeastMemberPairQuery } from "src/domain/commands/pair/get-one-least-member-pair-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { PairCreateService } from "src/domain/services/pair/create-pair-service";
import { Participants } from "src/domain/values/participants";

@Injectable()
export class ParticipantToEnrollUseCase {
  constructor(
    private readonly getOneLeastMemberPairQuery: GetOneLeastMemberPairQuery,
    private readonly savePairCommand: SavePairCommand,
    private readonly pairCreateService: PairCreateService,
  ) { }

  async execute(participant: Participant): Promise<Pair> {
    const smallestPair = await this.getOneLeastMemberPairQuery.execute() as Pair;

    if (smallestPair.participantsLength < 3) {
      participant.changeEnrollmentStatusToEnrolled(smallestPair.getId, smallestPair.teamId);
      smallestPair.appendParticipant(participant);
      await this.savePairCommand.execute(smallestPair);
    } else {
      const mover = smallestPair.lastParticipant;
      const newParticipants = Participants.create([mover, participant]) as Participants;
      smallestPair.removeParticipant(mover);
      const enrolledPair = await (this.pairCreateService.execute({ teamId: smallestPair.teamId, participants: newParticipants })) as Pair;
    }

    // Save changes
    if (smallestPair !== enrolledPair) {
      await this.savePairCommand.execute(smallestPair);
    }
    await this.savePairCommand.execute(enrolledPair);

    return enrolledPair;
  }
}
