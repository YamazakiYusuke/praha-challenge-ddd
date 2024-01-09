import { Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { TeamId } from "src/domain/values/id";
import { IGetOneQuery } from "../base/get-one-query";

@Injectable()
export class GetPairsByTeamIdQuery implements IGetOneQuery<Pair[], TeamId> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(teamId: TeamId): Promise<Pair[] | Error> {
    const allPairs = await (this.pairRepository.getAll()) as Pair[];
    return allPairs.filter(pair => pair.teamId === teamId);
  }
}