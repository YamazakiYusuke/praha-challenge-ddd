import { Inject, Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { ICommand } from "../base/command";

@Injectable()
export class SavePairCommand implements ICommand<Pair> {
  constructor(
    @Inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(pair: Pair, transaction?: any): Promise<void> {
    await this.pairRepository.save(pair, transaction);
  }
}