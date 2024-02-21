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
import { IParticipantToOnLeaveService } from "src/domain/services/participant/participant-to-on-leave-service";
import { PairId, ParticipantId, TeamId } from "src/domain/values/id";
import { debuglog } from "util";

@Injectable()
export class ParticipantToOnLeaveUseCase {
  constructor(
    @Inject('IGetParticipantByIdQuery')
    private readonly getParticipantByIdQuery: IGetParticipantByIdQuery,
    @Inject('IParticipantToOnLeaveService')
    private readonly participantToOnLeaveService: IParticipantToOnLeaveService,
  ) { }

  async execute(participantId: ParticipantId): Promise<SuccessResponse | ErrorResponse> {
    try {
      const participant = await this.getParticipantByIdQuery.execute(participantId) as Participant;
      await this.participantToOnLeaveService.execute(participant);
      return new SuccessResponse('参加者のステータス更新に成功失敗しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者のステータス更新に失敗しました');
    }

  }
}
