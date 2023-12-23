import { Injectable } from "@nestjs/common";
import { GetOneLeastMemberPairQuery } from "src/domain/commands/pair/get-one-least-member-pair-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { Pair } from "src/domain/entities/pair";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { Participants } from "src/domain/entities/participants";
import { GetOneParticipantByIdQuery } from "src/domain/commands/participant/get-one-participant-by-id-query";
import { Id } from "src/domain/values/id";
import { Participant } from "src/domain/entities/participant";

@Injectable()
export class ParticipantToEnrollUseCase {
  constructor(
    private readonly getOneParticipantQuery: GetOneParticipantByIdQuery,
    private readonly getOneLeastMemberPairQuery: GetOneLeastMemberPairQuery,
    private readonly savePairCommand: SavePairCommand,
    private readonly createPairService: CreatePairService,
  ) { }

  async execute(participantId: string): Promise<void | Error> {
    const participant = await this.getOneParticipantQuery.execute(Id.restore(participantId)) as Participant;
    const smallestPair = await this.getOneLeastMemberPairQuery.execute() as Pair;

    if (smallestPair.participantsLength < 3) {
      smallestPair.appendParticipant(participant);
      await this.savePairCommand.execute(smallestPair);
    } else {
      const mover = smallestPair.lastParticipant;
      smallestPair.removeParticipant(mover);
      const newParticipants = Participants.create([mover, participant]) as Participants;
      const enrolledPair = await (this.createPairService.execute({ teamId: smallestPair.teamId, participants: newParticipants })) as Pair;
      // TODO: 1つのトランザクションにする
      await this.savePairCommand.execute(smallestPair);
      await this.savePairCommand.execute(enrolledPair);
    }
  }
}
