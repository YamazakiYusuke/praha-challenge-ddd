import { Pair } from "../entities/pair";

export interface IPairRepository {
  save(pair: Pair): Promise<Pair>
  getAll(): Promise<Pair[]>
}
