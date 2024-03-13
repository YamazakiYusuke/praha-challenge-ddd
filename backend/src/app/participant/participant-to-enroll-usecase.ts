import { Inject, Injectable } from "@nestjs/common";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { IGetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { Participant } from "src/domain/entities/participant";
import { IParticipantToEnrollService } from "src/domain/services/participant/participant-to-enroll-service";
import { ParticipantId } from "src/domain/values/id";
import { debuglog } from "util";

@Injectable()
export class ParticipantToEnrollUseCase {
  constructor(
    @Inject('IGetParticipantByIdQuery')
    private readonly getParticipantByIdQuery: IGetParticipantByIdQuery,
    @Inject('IParticipantToEnrollService')
    private readonly participantToEnrollService: IParticipantToEnrollService,
  ) { }

  // Teamの更新
  async execute(participantId: ParticipantId): Promise<SuccessResponse | ErrorResponse> {
    try {
      return new SuccessResponse('参加者のステータス更新に成功失敗しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者のステータス更新に失敗しました');
    }
  }
}
