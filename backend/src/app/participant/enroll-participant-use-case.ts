import { Injectable } from "@nestjs/common";
import { GetOneLeastMemberPairQuery } from "src/domain/commands/pair/get-one-least-member-pair-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { PairCreateService } from "src/domain/services/pair/pair-create-service";
import { Participants } from "src/domain/values/participants";

@Injectable()
export class EnrollParticipantUseCase {
  constructor(
    private readonly getOneLeastMemberPairQuery: GetOneLeastMemberPairQuery,
    private readonly savePairCommand: SavePairCommand,
    private readonly pairCreateService: PairCreateService,
  ) { }

  async execute(participant: Participant): Promise<Pair> {
    const smallestPair = await this.getOneLeastMemberPairQuery.execute() as Pair;
    let enrolledPair: Pair;

    if (smallestPair.participantsLength < 3) {
      smallestPair.appendParticipant(participant);
      enrolledPair = smallestPair;
    } else {
      const mover = smallestPair.lastParticipant;
      const newParticipants = Participants.create([mover, participant]) as Participants;
      smallestPair.removeParticipant(mover);
      enrolledPair = await (this.pairCreateService.execute({ teamId: smallestPair.teamId, participants: newParticipants })) as Pair;
    }

    participant.changeEnrollmentStatusToEnrolled(enrolledPair.getId, enrolledPair.teamId);

    // Save changes
    if (smallestPair !== enrolledPair) {
      await this.savePairCommand.execute(smallestPair);
    }
    await this.savePairCommand.execute(enrolledPair);

    return enrolledPair;
  }
}
