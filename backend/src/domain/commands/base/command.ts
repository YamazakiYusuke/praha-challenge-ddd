import { RepositoryError } from "src/domain/errors/repository_error";

export interface ICommand<P> {
  execute(param: P): Promise<void | RepositoryError>;
}