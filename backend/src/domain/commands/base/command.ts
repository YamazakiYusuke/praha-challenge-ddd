import { RepositoryError } from "src/domain/errors/repository_error";

export interface ICommand {
  execute(): Promise<void | RepositoryError>;
}