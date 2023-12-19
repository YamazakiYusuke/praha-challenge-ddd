import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SavePairCommand implements ICommand<Pair> {
  constructor(private readonly pairRepository: IPairRepository) {}

  async execute(pair: Pair): Promise<void | RepositoryError> {
    await this.pairRepository.save(pair);
  }
}