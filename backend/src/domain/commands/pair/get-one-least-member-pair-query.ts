import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Injectable } from "@nestjs/common";
import { CommandError } from "src/domain/errors/command_error";
import { createRandomNumber } from "src/util/random";
import { IGetAllQuery } from "../base/get-all-query";

@Injectable()
export class GetOneLeastMemberPairQuery implements IGetAllQuery<Pair> {
  constructor(private pairRepository: IPairRepository) { }

  async execute(): Promise<Pair | CommandError | RepositoryError> {
    const result = await this.pairRepository.getAll();
    const allPairs = result as Pair[];
    if (allPairs.length === 0) throw new CommandError('ペアが存在しません');
    return allPairs[createRandomNumber(allPairs.length)] as Pair;
  }
}