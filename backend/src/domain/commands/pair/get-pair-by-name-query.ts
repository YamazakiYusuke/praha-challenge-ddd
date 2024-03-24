import { Inject, Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { PairName } from "src/domain/values/name";
import { IGetQuery } from "../base/get-query";

export interface IGetPairByNameQuery extends IGetQuery<Pair, PairName> {
  execute(name: PairName): Promise<Pair | null>;
}

@Injectable()
export class GetPairByNameQuery implements IGetPairByNameQuery {
  constructor(
    @Inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(name: PairName): Promise<Pair | null> {
    const pairs = await this.pairRepository.getAll();
    return pairs.find((pair: Pair) => pair.name.isEqual(name)) || null;
  }
}