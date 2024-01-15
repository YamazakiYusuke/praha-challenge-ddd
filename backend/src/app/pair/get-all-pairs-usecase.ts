import { Injectable } from "@nestjs/common";
import { GetAllPairsQuery } from "src/domain/commands/pair/get-all-pairs-query";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";
import { PairDTO } from "./dto/pair-dto";
import { Pair } from "src/domain/entities/pair";

@Injectable()
export class GetAllPairsUsecase {
  constructor(
    private readonly getAllPairsQuery: GetAllPairsQuery,
  ) { }

  public async execute(): Promise<PairDTO[] | ErrorResponse> {
    try {
      const pairs = await this.getAllPairsQuery.execute() as Pair[];
      const pairDTOs = pairs.map(e => new PairDTO(e));
      return pairDTOs;
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('ペアの取得に失敗しました');
    }
  }
}