import { Participant } from "../../entities/participant";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { RepositoryError } from "../../errors/repository_error";
import { Injectable } from "@nestjs/common";
import { GetOneLeastMemberPairQuery } from "src/domain/commands/pair/get-one-least-member-pair-query";
import { Pair } from "src/domain/entities/pair";
import { PairCreateService } from "../pair/pair-create-service";
import { Participants } from "src/domain/values/participants";

@Injectable()
export class ParticipantChangeEnrollmentStatusToEnrolledService {
  constructor(private readonly pairCreateService: PairCreateService ,private readonly getOneLeastMemberPairQuery: GetOneLeastMemberPairQuery) { }

  async execute(participant: Participant): Promise<Pair | EntityCreationError | RepositoryError> {
    let enrolledPair: Pair;
    // 全ペアの中で一番人数の少ないペアを取得
    const smallestPair = await (this.getOneLeastMemberPairQuery.execute()) as Pair;
    if (smallestPair.participantsLength < 3) {
      smallestPair.appendAParticipant(participant);
      enrolledPair = smallestPair;
    } else {
      const mover = smallestPair.lastParticipant;
      const newParticipants = Participants.create([mover, participant]) as Participants;
      const newPair = await this.pairCreateService.execute({teamId: smallestPair.teamId, participants: newParticipants});
      smallestPair.removeParticipant(mover);
      // TODO: データの永続化
      enrolledPair = newPair as Pair;
    }
    participant.changeEnrollmentStatusToEnrolled(enrolledPair.getId, enrolledPair.teamId);
    // TODO: データの永続化
    return enrolledPair;
  }
}
