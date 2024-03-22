import { Pair } from "../entities/pair";

export interface IPairRepository {
  save(pairs: Pair, transaction?: any): Promise<void | Error>
  getAll(): Promise<Pair[] | Error>
}
