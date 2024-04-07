import { TeamDto } from "src/app/team/dto/team-dto";
import { GetAllTeamsQuery } from "src/domain/commands/team/get-all-team-query";
import { inject, injectable } from "tsyringe";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";

@injectable()
export class GetAllTeamsUsecase {
  constructor(
    @inject(GetAllTeamsQuery)
    private readonly getAllTeamsQuery: GetAllTeamsQuery,
  ) { }

  public async execute(): Promise<TeamDto[] | ErrorResponse> {
    try {
      const teams = await this.getAllTeamsQuery.execute();
      return teams.map((team) => new TeamDto(team));
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('チームの取得に失敗しました');
    }
  }
}