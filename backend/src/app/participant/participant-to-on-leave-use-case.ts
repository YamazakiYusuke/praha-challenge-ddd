import { Injectable } from "@nestjs/common";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { GetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { GetPairWithFewestMembersByTeamIdQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-by-team-id-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { GetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { PairId, ParticipantId, TeamId } from "src/domain/values/id";
import { debuglog } from "util";

@Injectable()
export class ParticipantToOnLeaveUseCase {
  constructor(
    private readonly getParticipantByIdQuery: GetParticipantByIdQuery,
    private readonly getPairByIdQuery: GetPairByIdQuery,
    private readonly getPairWithFewestMembersByTeamIdQuery: GetPairWithFewestMembersByTeamIdQuery,
    private readonly enrollParticipantService: EnrollParticipantService,
    private readonly savePairCommand: SavePairCommand,
  ) { }

  async execute(participantId: ParticipantId): Promise<SuccessResponse | ErrorResponse> {
    try {
      const participant = await this.getParticipantByIdQuery.execute(participantId) as Participant;
      const pair = await this.getPairByIdQuery.execute(participant.pairId as PairId) as Pair;
      pair.changeParticipantEnrollmentStatusToOnLeave(participant);
      if (pair.participantsLength < 2) {
        // TODO: メール送信サービス　「どの参加者が減ったのか」「どのチームが2名以下になったのか」「そのチームの現在の参加者名」を記載する
      }

      if (pair.participantsLength == 1) {
        const smallestPair = await this.getPairWithFewestMembersByTeamIdQuery.execute(pair.teamId as TeamId) as Pair | null;
        if (smallestPair == null) {
          // TODO: 管理者にメール　「どの参加者が減ったのか」「どの参加者が合流先を探しているのか」
          throw Error('参加可能なペアがありません');
        }
        const pairs = await this.enrollParticipantService.execute(smallestPair, participant) as Pair[];
        await this.savePairCommand.execute(pairs);
      }
      return new SuccessResponse('参加者のステータス更新に成功失敗しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者のステータス更新に失敗しました');
    }

  }
}
