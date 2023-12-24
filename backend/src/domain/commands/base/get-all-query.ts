
export interface IGetAllQuery<T> {
  execute(): Promise<T | Error>;
}