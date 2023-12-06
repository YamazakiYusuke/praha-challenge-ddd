import { RepositoryError } from "src/domain/errors/repository_error";

export interface IGetAllQuery<T> {
  execute(): Promise<T | RepositoryError>;
}