import { Pair } from "../entities/pair";
import { RepositoryError } from "../errors/repository_error";
import { Name } from "../values/name";

export interface IPairRepository {
  save(pair: Pair): Promise<void | RepositoryError>
  get(name: Name): Promise<Pair | null | RepositoryError>
  getAll(): Promise<Pair[] | RepositoryError>
}
