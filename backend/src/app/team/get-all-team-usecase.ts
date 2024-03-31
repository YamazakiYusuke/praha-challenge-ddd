import { GetAllTeamsQuery } from "src/domain/commands/team/get-all-team-query";
import { Team } from "src/domain/entities/team";
import { inject, injectable } from "tsyringe";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";

@injectable()
export class GetAllTeamsUsecase {
  constructor(
    @inject(GetAllTeamsQuery)
    private readonly getAllTeamsQuery: GetAllTeamsQuery,
  ) { }

  public async execute(): Promise<Team[] | ErrorResponse> {
    try {
      return await this.getAllTeamsQuery.execute();
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('チームの取得に失敗しました');
    }
  }
}