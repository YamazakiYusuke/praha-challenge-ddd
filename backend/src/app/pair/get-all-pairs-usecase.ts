import { GetAllPairsQuery } from "src/domain/commands/pair/get-all-pairs-query";
import { Pair } from "src/domain/entities/pair";
import { container, inject, injectable } from "tsyringe";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";

@injectable()
export class GetAllPairsUsecase {
  constructor(
    @inject(GetAllPairsQuery)
    private readonly getAllPairsQuery: GetAllPairsQuery,
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