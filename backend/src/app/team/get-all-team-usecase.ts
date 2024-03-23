import { Inject, Injectable } from "@nestjs/common";
import { IGetAllTeamsQuery } from "src/domain/commands/team/get-all-team-query";
import { Team } from "src/domain/entities/team";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";

@Injectable()
export class GetAllTeamsUsecase {
  constructor(
    @Inject('IGetAllTeamsQuery')
    private readonly getAllTeamsQuery: IGetAllTeamsQuery,
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