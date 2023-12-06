import { RepositoryError } from "src/domain/errors/repository_error";

export interface IGetOneQuery<T> {
  execute(): Promise<T | null | RepositoryError>;
}