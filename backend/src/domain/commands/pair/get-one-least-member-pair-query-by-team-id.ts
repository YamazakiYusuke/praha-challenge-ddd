import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Name } from "src/domain/values/name";
import { IGetOneQuery } from "../base/get-one-query";
import { Injectable } from "@nestjs/common";
import { Id } from "src/domain/values/id";
import { CommandError } from "src/domain/errors/command_error";
import { createRandomNumUpTo } from "src/util/random";

@Injectable()
export class GetOneLeastMemberPairQuery implements IGetOneQuery<Pair, Name> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(teamId: Id): Promise<Pair | CommandError | RepositoryError> {
    const result = await this.pairRepository.getAll();
    const allPairs = result as Pair[];
    const pairs = allPairs.filter((pair: Pair) => pair.teamId.isEqual(teamId));
    if (pairs.length === 0) throw new CommandError(`チーム${teamId}にペアが存在しません`);
    return pairs[createRandomNumUpTo(pairs.length)] as Pair;
  }
}