import { Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { CommandError } from "src/domain/errors/command_error";
import { RepositoryError } from "src/domain/errors/repository_error";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { createRandomNumUpTo } from "src/util/random";
import { IGetAllQuery } from "../base/get-all-query";

@Injectable()
export class GetPairWithFewestMembersQuery implements IGetAllQuery<Pair> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(): Promise<Pair | CommandError | RepositoryError> {
    const result = await this.pairRepository.getAll();
    const allPairs = result as Pair[];
    if (allPairs.length === 0) throw new CommandError('ペアが存在しません');
    return allPairs[createRandomNumUpTo(allPairs.length)] as Pair;
  }
}