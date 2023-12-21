import { Injectable } from "@nestjs/common";
import { GetOneLeastMemberPairQuery } from "src/domain/commands/pair/get-one-least-member-pair-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { Name } from "src/domain/values/name";
import { Participants } from "src/domain/values/participants";

@Injectable()
export class ParticipantToOnLeaveUseCase {
  constructor(
    private readonly getOneLeastMemberPairQuery: GetOneLeastMemberPairQuery,
    private readonly savePairCommand: SavePairCommand,
    private readonly createPairService: CreatePairService,
  ) { }

  async execute(participant: Participant): Promise<void | Error> {
    // TODO 
    // const smallestPair = await this.getOneLeastMemberPairQuery.execute() as Pair;

    // if (smallestPair.participantsLength < 3) {
    //   smallestPair.appendParticipant(participant);
    //   participant.changeEnrollmentStatusToEnrolled(smallestPair.getId, smallestPair.teamId);
    //   await this.savePairCommand.execute(smallestPair);
    // } else {
    //   const mover = smallestPair.lastParticipant;
    //   const newParticipants = Participants.create([mover, participant]) as Participants;
    //   smallestPair.removeParticipant(mover);
    //   const enrolledPair = await (this.createPairService.execute({ teamId: smallestPair.teamId, participants: newParticipants })) as Pair;
    //   participant.changeEnrollmentStatusToEnrolled(enrolledPair.getId, enrolledPair.teamId);
    //   await this.savePairCommand.execute(enrolledPair);
    //   await this.savePairCommand.execute(smallestPair);
    // }
  }
}
