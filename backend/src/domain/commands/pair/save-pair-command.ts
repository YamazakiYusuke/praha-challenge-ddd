import { Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { ICommand } from "../base/command";

@Injectable()
export class SavePairCommand implements ICommand<Pair[]> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(pairs: Pair[]): Promise<void | Error> {
    await this.pairRepository.save(pairs);
  }
}