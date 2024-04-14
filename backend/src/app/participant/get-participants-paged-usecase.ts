import { ParticipantDto } from "src/app/participant/dto/participant-dto";
import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseErrorResponse, UsecaseSuccessResponse } from "src/app/responses/usecase-responses";
import { GetParticipantsWithAssignmentsPagedQuery, ParticipantPaginationProps } from "src/domain/commands/participant/get-participants-paged-query";
import { BaseError } from "src/domain/errors/base/base_error";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetParticipantsPagedUsecase {
  constructor(
    @inject(GetParticipantsWithAssignmentsPagedQuery)
    private readonly getParticipantsWithAssignmentsPagedQuery: GetParticipantsWithAssignmentsPagedQuery,
  ) { }

  public async execute(props: ParticipantPaginationProps): Promise<UsecaseSuccessResponse<ParticipantDto[]> | UsecaseErrorResponse> {
    try {
      const participants = await this.getParticipantsWithAssignmentsPagedQuery.execute(props);
      const value = participants.map((participant) => new ParticipantDto(participant));
      return new UsecaseSuccessResponse(value);
    } catch (e: any) {
      if (e instanceof BaseError) {
        return new ExpectedErrorResponse();
      } else {
        return new UnExpectedErrorResponse();
      }
    }
  }
}
