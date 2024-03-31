import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { GetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { WithdrawnParticipantService } from "src/domain/services/participant/withdrawn-participant-service";
import { ParticipantId } from "src/domain/values/id";
import { inject, injectable } from "tsyringe";
import { debuglog } from "util";

@injectable()
export class WithdrawnParticipantUseCase {
  constructor(
    @inject(WithdrawnParticipantService)
    private readonly withdrawnParticipantService: WithdrawnParticipantService,
    @inject(GetParticipantByIdQuery)
    private readonly getParticipantByIdQuery: GetParticipantByIdQuery,
  ) { }

  async execute(participantId: ParticipantId): Promise<SuccessResponse | ErrorResponse> {
    try {
      const participant = await this.getParticipantByIdQuery.execute(participantId);
      if (participant == null) {
        throw Error('参加者が見つかりませんでした');
      }
      await this.withdrawnParticipantService.execute(participant);
      return new SuccessResponse('参加者のステータス更新に成功失敗しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者のステータス更新に失敗しました');
    }
  }
}
