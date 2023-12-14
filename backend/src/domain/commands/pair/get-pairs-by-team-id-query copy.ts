import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { IGetAllQuery } from "../base/get-all-query";
import { Injectable } from "@nestjs/common";
import { IGetOneQuery } from "../base/get-one-query";
import { Id } from "src/domain/values/id";

@Injectable()
export class GetPairsByTeamIdQuery implements IGetOneQuery<Pair[], Id> {
  constructor(private pairRepository: IPairRepository) { }

  async execute(teamId: Id): Promise<Pair[] | RepositoryError> {
    const allPairs = await (this.pairRepository.getAll()) as Pair[];
    return allPairs.filter(pair => pair.teamId === teamId);
  }
}