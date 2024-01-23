import { Injectable, Inject } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { ICommand } from "../base/command";

export interface ISavePairCommand extends ICommand<Pair[]> {
  execute(pairs: Pair[]): Promise<void | Error>;
}

@Injectable()
export class SavePairCommand implements ISavePairCommand {
  constructor(
    @Inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(pairs: Pair[]): Promise<void | Error> {
    await this.pairRepository.save(pairs);
  }
}