import { ParticipantDto } from "src/app/participant/dto/participant-dto";
import { ExpectedErrorResponse, SuccessResponse, UnExpectedErrorResponse, UsecaseResponse } from "src/app/responses/usecase-responses";
import { BaseError } from "src/domain/errors/base/base_error";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddNewParticipantUsecase {
  constructor(
    @inject(EnrollParticipantService)
    private readonly enrollParticipantService: EnrollParticipantService,
  ) { }

  async execute(participantDto: ParticipantDto): Promise<UsecaseResponse> {
    try {
      await this.enrollParticipantService.execute(participantDto.toEntity);
      return new SuccessResponse(null);
    } catch (e: any) {
      if (e instanceof BaseError) {
        return new ExpectedErrorResponse();
      } else {
        return new UnExpectedErrorResponse();
      }
    }
  }
}
