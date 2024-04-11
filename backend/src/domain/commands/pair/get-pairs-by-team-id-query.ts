import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { TeamId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetPairsByTeamIdQuery implements IGetQuery<Pair[], TeamId> {
  constructor(
    @inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(teamId: TeamId): Promise<Pair[]> {
    const allPairs = await this.pairRepository.getAll();
    return allPairs.filter(pair => pair.teamId.isEqual(teamId));
  }
}