
export interface IGetOneQuery<T, P> {
  execute(param: P): Promise<T | null | Error>;
}