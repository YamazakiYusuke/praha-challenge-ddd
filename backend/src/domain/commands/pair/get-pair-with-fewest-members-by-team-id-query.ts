import { Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { CommandError } from "src/domain/errors/command_error";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { Id } from "src/domain/values/id";
import { createRandomNumUpTo } from "src/util/random";
import { IGetOneQuery } from "../base/get-one-query";

@Injectable()
export class GetPairWithFewestMembersByTeamIdQuery implements IGetOneQuery<Pair, Id> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(teamId: Id): Promise<Pair | null | Error> {
    const result = await this.pairRepository.getAll();
    const allPairs = result as Pair[];
    const pairs = allPairs.filter((pair: Pair) => pair.teamId.isEqual(teamId));
    if (pairs.length === 0) throw new CommandError(`チーム${teamId}にペアが存在しません`);
    return pairs[createRandomNumUpTo(pairs.length)] ?? null;
  }
}