import { ParticipantDto } from "src/app/participant/dto/participant-dto";
import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseErrorResponse, UsecaseSuccessResponse } from "src/app/responses/usecase-responses";
import { GetAllParticipantsQuery } from "src/domain/commands/participant/get-all-participants-query";
import { BaseError } from "src/domain/errors/base/base_error";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllParticipantsUsecase {
  constructor(
    @inject(GetAllParticipantsQuery)
    private readonly getAllParticipantsQuery: GetAllParticipantsQuery,
  ) { }

  public async execute(): Promise<UsecaseSuccessResponse<ParticipantDto[]> | UsecaseErrorResponse> {
    try {
      const participants = await this.getAllParticipantsQuery.execute();
      const value = participants.map((participant) => ParticipantDto.fromEntity(participant));
      return new UsecaseSuccessResponse(value);
    } catch (e: any) {
      console.error('GetAllParticipantsUsecase:', e);
      if (e instanceof BaseError) {
        return new ExpectedErrorResponse();
      } else {
        return new UnExpectedErrorResponse();
      }
    }
  }
}
