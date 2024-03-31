import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { GetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { ParticipantId } from "src/domain/values/id";
import { inject, injectable } from "tsyringe";
import { debuglog } from "util";

@injectable()
export class EnrollParticipantUseCase {
  constructor(
    @inject(EnrollParticipantService)
    private readonly enrollParticipantService: EnrollParticipantService,
    @inject(GetParticipantByIdQuery)
    private readonly getParticipantByIdQuery: GetParticipantByIdQuery,
  ) { }

  // Teamの更新
  async execute(participantId: ParticipantId): Promise<SuccessResponse | ErrorResponse> {
    try {
      const participant = await this.getParticipantByIdQuery.execute(participantId);
      if (participant == null) {
        throw Error('参加者が見つかりませんでした');
      }
      await this.enrollParticipantService.execute(participant)
      return new SuccessResponse('参加者のステータス更新に成功失敗しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者のステータス更新に失敗しました');
    }
  }
}
