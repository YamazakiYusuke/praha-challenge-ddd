import { debuglog } from "util";
import { GetAllTeamsQuery } from "src/domain/commands/team/get-all-team-query";
import { TeamDTO } from "./team-dto";
import { ErrorResponse } from "../responses/error-response";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllTeamsUsecase {
  constructor(
    private readonly getAllTeamsQuery: GetAllTeamsQuery,
  ) { }

  public async execute(): Promise<TeamDTO[] | ErrorResponse> {
    try {
      const pairs = await this.getAllTeamsQuery.execute() as [];
      const teamDTOs = pairs.map(e => new TeamDTO(e));
      return teamDTOs;
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('チームの取得に失敗しました');
    }
  }
}