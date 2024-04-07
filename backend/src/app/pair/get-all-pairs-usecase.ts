import { PairDto } from "src/app/pair/pair_dto";
import { GetAllPairsQuery } from "src/domain/commands/pair/get-all-pairs-query";
import { inject, injectable } from "tsyringe";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";

@injectable()
export class GetAllPairsUsecase {
  constructor(
    @inject(GetAllPairsQuery)
    private readonly getAllPairsQuery: GetAllPairsQuery,
  ) { }

  public async execute(): Promise<PairDto[] | ErrorResponse> {
    try {
      const pairs = await this.getAllPairsQuery.execute();
      return pairs.map((pair) => new PairDto(pair));
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('ペアの取得に失敗しました');
    }
  }
}