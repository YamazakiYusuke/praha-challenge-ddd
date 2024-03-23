import { Inject, Injectable } from "@nestjs/common";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { Participant } from "src/domain/entities/participant";
import { IParticipantToEnrollService } from "src/domain/services/participant/participant-to-enroll-service";
import { debuglog } from "util";

@Injectable()
export class AddNewParticipantUsecase {
  constructor(
    @Inject('IParticipantToEnrollService')
    private readonly participantToEnrollService: IParticipantToEnrollService
  ) { }

  async execute(participant: Participant): Promise<SuccessResponse | ErrorResponse> {
    try {
      await this.participantToEnrollService.execute(participant);
      return new SuccessResponse('新規参加者の追加に成功しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('新規参加者の追加に失敗しました');
    }
  }
}

