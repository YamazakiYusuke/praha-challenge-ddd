import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";

export class InMemoryPairRepository implements IPairRepository {
  private pairs: Pair[] = [];

  async save(pair: Pair): Promise<void> {
    this.pairs.push(pair);
    return;
  }

  async getAll(): Promise<Pair[]> {
    return this.pairs;
  }

  async delete(pair: Pair): Promise<void> {
    this.pairs = this.pairs.filter((thisPair: Pair) => !thisPair.id.isEqual(pair.id));
    return;
  }
}
