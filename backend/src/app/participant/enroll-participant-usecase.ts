import { ParticipantDto } from "src/app/participant/dto/participant-dto";
import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseErrorResponse, UsecaseSuccessResponse } from "src/app/responses/usecase-responses";
import { BaseError } from "src/domain/errors/base/base_error";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { inject, injectable } from "tsyringe";

@injectable()
export class EnrollParticipantUseCase {
  constructor(
    @inject(EnrollParticipantService)
    private readonly enrollParticipantService: EnrollParticipantService,
  ) { }

  // Teamの更新
  async execute(participantDto: ParticipantDto): Promise<UsecaseSuccessResponse<null> | UsecaseErrorResponse> {
    try {
      await this.enrollParticipantService.execute(participantDto.toEntity)
      return new UsecaseSuccessResponse(null);
    } catch (e: any) {
      if (e instanceof BaseError) {
        return new ExpectedErrorResponse();
      } else {
        return new UnExpectedErrorResponse();
      }
    }
  }
}
