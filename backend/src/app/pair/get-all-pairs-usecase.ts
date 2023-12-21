import { GetAllPairsQuery } from "src/domain/commands/pair/get-all-pairs-query";
import { ErrorResponse } from "../responses/error-response";
import { debuglog } from "util";
import { PairDTO } from "./pair-dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllPairsUsecase {
  constructor(
    private readonly getAllPairsQuery: GetAllPairsQuery,
  ) { }

  public async execute(): Promise<PairDTO[] | ErrorResponse> {
    try {
      const pairs = await this.getAllPairsQuery.execute() as [];
      const pairDTOs = pairs.map(e => new PairDTO(e));
      return pairDTOs;
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('ペアの取得に失敗しました');
    }
  }
}