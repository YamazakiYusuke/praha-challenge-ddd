import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { PairName } from "src/domain/values/name";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetPairByNameQuery implements IGetQuery<Pair, PairName> {
  constructor(
    @inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(name: PairName): Promise<Pair | null> {
    const pairs = await this.pairRepository.getAll();
    return pairs.find((pair: Pair) => pair.name.isEqual(name)) || null;
  }
}