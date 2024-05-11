import { ParticipantDto } from "src/app/participant/dto/participant-dto";
import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseErrorResponse, UsecaseSuccessResponse } from "src/app/responses/usecase-responses";
import { GetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { BaseError } from "src/domain/errors/base/base_error";
import { LeaveParticipantService } from "src/domain/services/participant/leave-participant-service";
import { ParticipantId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";

@injectable()
export class LeaveParticipantUseCase {
  constructor(
    @inject(LeaveParticipantService)
    private readonly leaveParticipantService: LeaveParticipantService,
    @inject(GetParticipantByIdQuery)
    private readonly getParticipantByIdQuery: GetParticipantByIdQuery,
  ) { }

  async execute(stringParticipantId: string): Promise<UsecaseSuccessResponse<null> | UsecaseErrorResponse> {
    try {
      const participantId = ParticipantId.restore(stringParticipantId);
      const participant = await this.getParticipantByIdQuery.execute(participantId);
      if (participant == null) return new ExpectedErrorResponse();
      await this.leaveParticipantService.execute(participant);
      return new UsecaseSuccessResponse(null);
    } catch (e: any) {
      console.error('LeaveParticipantUseCase:', e);
      if (e instanceof BaseError) {
        return new ExpectedErrorResponse();
      } else {
        return new UnExpectedErrorResponse();
      }
    }
  }
}
