import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";

export class PrismaPairRepository implements IPairRepository {
  private pairs: Pair[] = [];

  async save(pair: Pair): Promise<void | Error> {
    this.pairs.push(pair);
    return;
  }

  async getAll(): Promise<Pair[] | Error> {
    return this.pairs;
  }
}
