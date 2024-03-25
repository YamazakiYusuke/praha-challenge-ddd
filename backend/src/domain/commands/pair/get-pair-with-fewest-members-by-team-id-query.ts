import { Inject, Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { CommandError } from "src/domain/errors/command_error";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { PairId, TeamId } from "src/domain/values/id";
import { createRandomNumUpTo } from "src/util/random";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetPairWithFewestMembersByTeamIdQuery implements IGetQuery<Pair, TeamId> {
  constructor(
    @Inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(teamId: TeamId, excludePairId?: PairId): Promise<Pair | null> {
    const allPairs = await this.pairRepository.getAll();
    const filteredPairs = allPairs.filter((pair: Pair) => 
      pair.teamId.isEqual(teamId) && pair.id !== excludePairId
    );

    if (filteredPairs.length === 0) {
      throw new CommandError(`チーム${teamId}にペアが存在しません`);
    }

    // 最もメンバー数が少ないペアを見つける
    const pairWithFewestMembers = filteredPairs.reduce((prev, current) => 
      (prev.participantsLength < current.participantsLength) ? prev : current
    );

    return pairWithFewestMembers ?? null;
  }
}