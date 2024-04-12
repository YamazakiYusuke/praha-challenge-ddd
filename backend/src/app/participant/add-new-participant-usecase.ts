import { ParticipantDto } from "src/app/participant/dto/participant-dto";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { isExpectedError } from "src/app/util/is-expected-error";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { inject, injectable } from "tsyringe";
import { debuglog } from "util";

@injectable()
export class AddNewParticipantUsecase {
  constructor(
    @inject(EnrollParticipantService)
    private readonly enrollParticipantService: EnrollParticipantService,
  ) { }

  async execute(participantDto: ParticipantDto): Promise<SuccessResponse | ErrorResponse> {
    try {
      await this.enrollParticipantService.execute(participantDto.toEntity);
      return new SuccessResponse('新規参加者の追加に成功しました');
    } catch (e: any) {
      debuglog(`Exception: ${e}`);
      if (isExpectedError(e)) {
        return new ErrorResponse(400, `新規参加者の追加に失敗しました。${e.name}:${e.message}`);
      } else {
        return new ErrorResponse(500, '新規参加者の追加に失敗しました。');
      }
    }
  }
}
