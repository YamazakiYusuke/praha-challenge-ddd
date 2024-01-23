import { Injectable, Inject } from "@nestjs/common";
import { IGetAllPairsQuery } from "src/domain/commands/pair/get-all-pairs-query";
import { Pair } from "src/domain/entities/pair";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";
import { PairDTO } from "./dto/pair-dto";

@Injectable()
export class GetAllPairsUsecase {
  constructor(
    @Inject('IGetAllPairsQuery')
    private readonly getAllPairsQuery: IGetAllPairsQuery,
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