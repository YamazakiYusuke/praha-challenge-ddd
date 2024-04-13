import { ParticipantDto } from "src/app/participant/dto/participant-dto";
import { ExpectedErrorResponse, SuccessResponse, UnExpectedErrorResponse, UsecaseResponse } from "src/app/responses/usecase-responses";
import { BaseError } from "src/domain/errors/base/base_error";
import { LeaveParticipantService } from "src/domain/services/participant/leave-participant-service";
import { inject, injectable } from "tsyringe";

@injectable()
export class LeaveParticipantUseCase {
  constructor(
    @inject(LeaveParticipantService)
    private readonly leaveParticipantService: LeaveParticipantService,
  ) { }

  async execute(participantDto: ParticipantDto): Promise<UsecaseResponse> {
    try {
      await this.leaveParticipantService.execute(participantDto.toEntity);
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
