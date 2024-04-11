import { IGetQuery } from "src/domain/commands/base/get-query";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetPairWithFewestMembersQuery implements IGetQuery<Pair, undefined> {
  constructor(
    @inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(): Promise<Pair | null> {
    const allPairs = await this.pairRepository.getAll();
    if (allPairs.length === 0) return null;

    // 最もメンバーが少ないペアを見つける
    const pairWithFewestMembers = allPairs.reduce((prev, current) => {
      return (prev.participantsLength < current.participantsLength) ? prev : current;
    });

    return pairWithFewestMembers;
  }
}