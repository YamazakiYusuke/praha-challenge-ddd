import { Pair } from "../entities/pair";

export interface IPairRepository {
  save(pair: Pair): Promise<void | Error>
  getAll(): Promise<Pair[] | Error>
}
