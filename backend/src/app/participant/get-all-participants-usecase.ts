import { ParticipantDto } from "src/app/participant/dto/participant-dto";
import { ExpectedErrorResponse, SuccessResponse, UnExpectedErrorResponse, UsecaseResponse } from "src/app/responses/usecase-responses";
import { GetAllParticipantsQuery } from "src/domain/commands/participant/get-all-participants-query";
import { BaseError } from "src/domain/errors/base/base_error";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllParticipantsUsecase {
  constructor(
    @inject(GetAllParticipantsQuery)
    private readonly getAllParticipantsQuery: GetAllParticipantsQuery,
  ) { }

  public async execute(): Promise<UsecaseResponse> {
    try {
      const participants = await this.getAllParticipantsQuery.execute();
      const value = participants.map((participant) => new ParticipantDto(participant));
      return new SuccessResponse(value);
    } catch (e: any) {
      if (e instanceof BaseError) {
        return new ExpectedErrorResponse();
      } else {
        return new UnExpectedErrorResponse();
      }
    }
  }
}
