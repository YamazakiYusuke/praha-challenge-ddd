import { RepositoryError } from "src/domain/errors/repository_error";
// TODO: IQueryWithAParam
export interface IGetOneQuery<T, P> {
  execute(param: P): Promise<T | null | RepositoryError>;
}