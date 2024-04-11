import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { inject, injectable } from "tsyringe";
import { ICommand } from "../base/command";

@injectable()
export class SavePairCommand implements ICommand<Pair> {
  constructor(
    @inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(pair: Pair, transaction?: any): Promise<void> {
    await this.pairRepository.save(pair, transaction);
  }
}