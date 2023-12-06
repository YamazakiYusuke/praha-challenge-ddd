import { Pair } from "../entities/pair";
import { RepositoryError } from "../errors/repository_error";

export interface IPairRepository {
  save(pair: Pair): Promise<Pair | RepositoryError>
  getAll(): Promise<Pair[] | RepositoryError>
}
