import { Inject, Injectable } from "@nestjs/common";
import { IGetAllPairsQuery } from "src/domain/commands/pair/get-all-pairs-query";
import { Pair } from "src/domain/entities/pair";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";

@Injectable()
export class GetAllPairsUsecase {
  constructor(
    @Inject('IGetAllPairsQuery')
    private readonly getAllPairsQuery: IGetAllPairsQuery,
  ) { }

  public async execute(): Promise<Pair[] | ErrorResponse> {
    try {
      return await this.getAllPairsQuery.execute();
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('ペアの取得に失敗しました');
    }
  }
}