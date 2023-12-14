import { RepositoryError } from "src/domain/errors/repository_error";

// TODO: IQuery
export interface IGetAllQuery<T> {
  execute(): Promise<T | RepositoryError>;
}