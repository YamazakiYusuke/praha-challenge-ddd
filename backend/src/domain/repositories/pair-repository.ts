import { Pair } from "../entities/pair";

export interface IPairRepository {
  save(pairs: Pair[]): Promise<void | Error>
  getAll(): Promise<Pair[] | Error>
}
