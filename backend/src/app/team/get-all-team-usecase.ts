import { Injectable, Inject } from "@nestjs/common";
import { IGetAllTeamsQuery } from "src/domain/commands/team/get-all-team-query";
import { Team } from "src/domain/entities/team";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";
import { TeamDTO } from "./team-dto";

@Injectable()
export class GetAllTeamsUsecase {
  constructor(
    @Inject('IGetAllTeamsQuery')
    private readonly getAllTeamsQuery: IGetAllTeamsQuery,
  ) { }

  public async execute(): Promise<TeamDTO[] | ErrorResponse> {
    try {
      const pairs = await this.getAllTeamsQuery.execute() as Team[];
      const teamDTOs = pairs.map(e => new TeamDTO(e));
      return teamDTOs;
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('チームの取得に失敗しました');
    }
  }
}