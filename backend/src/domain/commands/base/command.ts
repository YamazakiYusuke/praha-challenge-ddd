
export interface ICommand<P> {
  execute(param: P, transaction?: any): Promise<void>;
}