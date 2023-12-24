
export interface ICommand<P> {
  execute(param: P): Promise<void | Error>;
}