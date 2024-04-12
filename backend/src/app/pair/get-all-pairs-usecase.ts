import { PairDto } from "src/app/pair/dto/pair-dto";
import { GetAllPairsQuery } from "src/domain/commands/pair/get-all-pairs-query";
import { inject, injectable } from "tsyringe";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";
import { isExpectedError } from "src/app/util/is-expected-error";

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
    } catch (e: any) {
      debuglog(`Exception: ${e}`);
      if (isExpectedError(e)) {
        return new ErrorResponse(400, `ペアの取得に失敗しました。${e.name}:${e.message}`);
      } else {
        return new ErrorResponse(500, 'ペアの取得に失敗しました。');
      }
    }
  }
}