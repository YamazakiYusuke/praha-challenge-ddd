import { Inject, Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { TeamId } from "src/domain/values/id";
import { IGetQuery } from "../base/get-query";

export interface IGetPairsByTeamIdQuery extends IGetQuery<Pair[], TeamId> {
  execute(teamId: TeamId): Promise<Pair[]>;
}

@Injectable()
export class GetPairsByTeamIdQuery implements IGetPairsByTeamIdQuery {
  constructor(
    @Inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(teamId: TeamId): Promise<Pair[]> {
    const allPairs = await (this.pairRepository.getAll()) as Pair[];
    return allPairs.filter(pair => pair.teamId === teamId);
  }
}