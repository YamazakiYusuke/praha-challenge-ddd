import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseErrorResponse, UsecaseSuccessResponse } from "src/app/responses/usecase-responses";
import { GetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { BaseError } from "src/domain/errors/base/base_error";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { ParticipantId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";

@injectable()
export class EnrollParticipantUseCase {
  constructor(
    @inject(EnrollParticipantService)
    private readonly enrollParticipantService: EnrollParticipantService,
    @inject(GetParticipantByIdQuery)
    private readonly getParticipantByIdQuery: GetParticipantByIdQuery,
  ) { }

  async execute(stringParticipantId: string): Promise<UsecaseSuccessResponse<null> | UsecaseErrorResponse> {
    try {
      const participantId = ParticipantId.restore(stringParticipantId);
      const participant = await this.getParticipantByIdQuery.execute(participantId);
      console.log(participant)
      if (participant == null) return new ExpectedErrorResponse();
      await this.enrollParticipantService.execute(participant)
      return new UsecaseSuccessResponse(null);
    } catch (e: any) {
      console.error('EnrollParticipantUseCase:', e);
      if (e instanceof BaseError) {
        return new ExpectedErrorResponse();
      } else {
        return new UnExpectedErrorResponse();
      }
    }
  }
}
