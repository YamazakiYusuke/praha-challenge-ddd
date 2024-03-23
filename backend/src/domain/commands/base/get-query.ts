
export interface IGetQuery<T, P = undefined> {
  execute(param: P): Promise<T | null>;
}