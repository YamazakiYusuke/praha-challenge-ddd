import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseErrorResponse, UsecaseSuccessResponse } from "src/app/responses/usecase-responses";
import { TeamDto } from "src/app/team/dto/team-dto";
import { GetAllTeamsQuery } from "src/domain/commands/team/get-all-team-query";
import { BaseError } from "src/domain/errors/base/base_error";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllTeamsUsecase {
  constructor(
    @inject(GetAllTeamsQuery)
    private readonly getAllTeamsQuery: GetAllTeamsQuery,
  ) { }

  public async execute(): Promise<UsecaseSuccessResponse<TeamDto[]> | UsecaseErrorResponse> {
    try {
      const teams = await this.getAllTeamsQuery.execute();
      const value = teams.map((team) => new TeamDto(team));
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