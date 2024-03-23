import { Injectable, Inject } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { ICommand } from "../base/command";

export interface ISavePairCommand extends ICommand<Pair> {
  execute(pair: Pair, transaction?: any): Promise<void | Error>;
}

@Injectable()
export class SavePairCommand implements ISavePairCommand {
  constructor(
    @Inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(pair: Pair, transaction?: any): Promise<void | Error> {
    await this.pairRepository.save(pair, transaction);
  }
}