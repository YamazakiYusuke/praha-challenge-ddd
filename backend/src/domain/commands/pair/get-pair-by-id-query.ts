import { Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { PairId } from "src/domain/values/id";
import { IGetOneQuery } from "../base/get-one-query";

@Injectable()
export class GetPairByIdQuery implements IGetOneQuery<Pair, PairId> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(id: PairId): Promise<Pair | null | Error> {
    const result = await this.pairRepository.getAll();
    const pairs = result as Pair[];
    return pairs.find((pair: Pair) => pair.id.isEqual(id)) || null;
  }
}