import { Inject, Injectable } from "@nestjs/common";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { IGetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { Participant } from "src/domain/entities/participant";
import { IParticipantToOnLeaveService } from "src/domain/services/participant/participant-to-on-leave-service";
import { ParticipantId } from "src/domain/values/id";
import { debuglog } from "util";

@Injectable()
export class ParticipantToOnLeaveUseCase {
  constructor(
    @Inject('IParticipantToOnLeaveService')
    private readonly participantToOnLeaveService: IParticipantToOnLeaveService,
    @Inject('IGetParticipantByIdQuery')
    private readonly getParticipantByIdQuery: IGetParticipantByIdQuery,
  ) { }

  async execute(participantId: ParticipantId): Promise<SuccessResponse | ErrorResponse> {
    try {
      const participant = await this.getParticipantByIdQuery.execute(participantId);
      if (participant == null) {
        throw Error('参加者が見つかりませんでした');
      }
      await this.participantToOnLeaveService.execute(participant);
      return new SuccessResponse('参加者のステータス更新に成功失敗しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者のステータス更新に失敗しました');
    }

  }
}
