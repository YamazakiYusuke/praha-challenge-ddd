import { Injectable, Inject } from "@nestjs/common";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { IGetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { IGetPairWithFewestMembersByTeamIdQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-by-team-id-query";
import { ISavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { IGetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { IEnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { PairId, ParticipantId, TeamId } from "src/domain/values/id";
import { debuglog } from "util";

@Injectable()
export class ParticipantToOnLeaveUseCase {
  constructor(
    @Inject('IGetParticipantByIdQuery')
    private readonly getParticipantByIdQuery: IGetParticipantByIdQuery,
    @Inject('IGetPairByIdQuery')
    private readonly getPairByIdQuery: IGetPairByIdQuery,
    @Inject('IGetPairWithFewestMembersByTeamIdQuery')
    private readonly getPairWithFewestMembersByTeamIdQuery: IGetPairWithFewestMembersByTeamIdQuery,
    @Inject('IEnrollParticipantService')
    private readonly enrollParticipantService: IEnrollParticipantService,
    @Inject('ISavePairCommand')
    private readonly savePairCommand: ISavePairCommand,
  ) { }

  async execute(participantId: ParticipantId): Promise<SuccessResponse | ErrorResponse> {
    try {
      const participant = await this.getParticipantByIdQuery.execute(participantId) as Participant;
      const pair = await this.getPairByIdQuery.execute(participant.pairId as PairId) as Pair;
      pair.changeParticipantEnrollmentStatusToOnLeave(participant);

      if (pair.hasInsufficientMinParticipants) {
        // TODO: メール送信サービス　「どの参加者が減ったのか」「どのチームが2名以下になったのか」「そのチームの現在の参加者名」を記載する
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
