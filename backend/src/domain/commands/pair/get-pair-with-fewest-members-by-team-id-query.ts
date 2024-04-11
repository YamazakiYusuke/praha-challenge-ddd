import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { PairId, TeamId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetPairWithFewestMembersByTeamIdQuery implements IGetQuery<Pair, TeamId> {
  constructor(
    @inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(teamId: TeamId, excludePairId?: PairId): Promise<Pair | null> {
    const allPairs = await this.pairRepository.getAll();
    const filteredPairs = allPairs.filter((pair: Pair) =>
      pair.teamId.isEqual(teamId) && pair.id !== excludePairId
    );

    if (filteredPairs.length === 0) return null

    // 最もメンバー数が少ないペアを見つける
    const pairWithFewestMembers = filteredPairs.reduce((prev, current) =>
      (prev.participantsLength < current.participantsLength) ? prev : current
    );

    return pairWithFewestMembers ?? null;
  }
}