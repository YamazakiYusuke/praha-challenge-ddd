import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Injectable } from "@nestjs/common";
import { CommandError } from "src/domain/errors/command_error";
import { IGetAllQuery } from "../base/get-all-query";
import { createRandomNumUpTo } from "src/util/random";

@Injectable()
export class GetOneLeastMemberPairQuery implements IGetAllQuery<Pair> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(): Promise<Pair | CommandError | RepositoryError> {
    const result = await this.pairRepository.getAll();
    const allPairs = result as Pair[];
    if (allPairs.length === 0) throw new CommandError('ペアが存在しません');
    return allPairs[createRandomNumUpTo(allPairs.length)] as Pair;
  }
}