import { GetAllPairsQuery } from "src/domain/commands/pair/get-all-pairs-query";
import { Pair } from "src/domain/entities/pair";
import { container } from "tsyringe";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";

export class GetAllPairsUsecase {
  constructor(
    private readonly getAllPairsQuery: GetAllPairsQuery = container.resolve(GetAllPairsQuery),
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