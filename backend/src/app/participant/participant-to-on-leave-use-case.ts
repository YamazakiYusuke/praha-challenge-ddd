import { Injectable } from "@nestjs/common";
import { GetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { GetOneParticipantByIdQuery } from "src/domain/commands/participant/get-one-participant-by-id-query";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { Id } from "src/domain/values/id";

@Injectable()
export class ParticipantToOnLeaveUseCase {
  constructor(
    private readonly getOneParticipantQuery: GetOneParticipantByIdQuery,
    private readonly getOnePairByIdQuery: GetPairByIdQuery,
  ) { }

  async execute(participantId: string): Promise<void | Error> {
    const participant = await this.getOneParticipantQuery.execute(Id.restore(participantId)) as Participant;
    const pair = await this.getOnePairByIdQuery.execute(participant.getId) as Pair;
    pair.changeParticipantEnrollmentStatusToOnLeave(participant);
    if (pair.participantsLength < 2) {
      // TODO: メール送信サービス　「どの参加者が減ったのか」「どのチームが2名以下になったのか」「そのチームの現在の参加者名」を記載する
    }

    if (pair.participantsLength < 1) {

    }
  }
}
