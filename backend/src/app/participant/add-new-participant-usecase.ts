import { Inject, Injectable } from "@nestjs/common";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { Participant } from "src/domain/entities/participant";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { container } from "tsyringe";
import { debuglog } from "util";

export class AddNewParticipantUsecase {
  constructor(
    private readonly enrollParticipantService: EnrollParticipantService = container.resolve(EnrollParticipantService),
  ) { }

  async execute(participant: Participant): Promise<SuccessResponse | ErrorResponse> {
    try {
      await this.enrollParticipantService.execute(participant);
      return new SuccessResponse('新規参加者の追加に成功しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('新規参加者の追加に失敗しました');
    }
  }
}

