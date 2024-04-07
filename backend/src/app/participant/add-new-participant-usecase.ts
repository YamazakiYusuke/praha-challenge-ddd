import { ParticipantDto } from "src/app/participant/dto/participant_dto";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { Participant } from "src/domain/entities/participant";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { Email } from "src/domain/values/email";
import { PairId, ParticipantId, TeamId } from "src/domain/values/id";
import { PersonName } from "src/domain/values/name";
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
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('新規参加者の追加に失敗しました');
    }
  }
}
