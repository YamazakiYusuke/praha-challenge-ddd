import { ParticipantDto } from "src/app/participant/dto/participant-dto";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { isExpectedError } from "src/app/util/is-expected-error";
import { WithdrawnParticipantService } from "src/domain/services/participant/withdrawn-participant-service";
import { inject, injectable } from "tsyringe";
import { debuglog } from "util";

@injectable()
export class WithdrawnParticipantUseCase {
  constructor(
    @inject(WithdrawnParticipantService)
    private readonly withdrawnParticipantService: WithdrawnParticipantService,
  ) { }

  async execute(participantDto: ParticipantDto): Promise<SuccessResponse | ErrorResponse> {
    try {
      await this.withdrawnParticipantService.execute(participantDto.toEntity);
      return new SuccessResponse('参加者のステータス更新に成功失敗しました');
    } catch (e: any) {
      debuglog(`Exception: ${e}`);
      if (isExpectedError(e)) {
        return new ErrorResponse(400, `参加者のステータス更新に失敗しました。${e.name}:${e.message}`);
      } else {
        return new ErrorResponse(500, '参加者のステータス更新に失敗しました。');
      }
    }
  }
}
