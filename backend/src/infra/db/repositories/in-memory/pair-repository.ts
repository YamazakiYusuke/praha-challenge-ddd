import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";

export class InMemoryPairRepository implements IPairRepository {
  private pairs: Pair[] = [];

  async save(pairs: Pair[]): Promise<void | Error> {
    this.pairs.push(...pairs);
    return;
  }

  async getAll(): Promise<Pair[] | Error> {
    return this.pairs;
  }
}
