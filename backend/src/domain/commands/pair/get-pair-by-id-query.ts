import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { PairId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetPairByIdQuery implements IGetQuery<Pair, PairId> {
  constructor(
    @inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(id: PairId): Promise<Pair | null> {
    const pairs = await this.pairRepository.getAll();
    return pairs.find((pair: Pair) => pair.id.isEqual(id)) || null;
  }
}