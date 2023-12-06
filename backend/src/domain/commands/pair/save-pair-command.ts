import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";

export class SavePairCommand implements ICommand {
  constructor(private pair: Pair, private pairRepository: IPairRepository) {}

  async execute(): Promise<void | RepositoryError> {
    await this.pairRepository.save(this.pair);
  }
}