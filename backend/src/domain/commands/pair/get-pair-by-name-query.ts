import { Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { RepositoryError } from "src/domain/errors/repository_error";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { PairName } from "src/domain/values/pair-name";
import { IGetOneQuery } from "../base/get-one-query";

@Injectable()
export class GetPairByNameQuery implements IGetOneQuery<Pair, PairName> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(name: PairName): Promise<Pair | null | RepositoryError> {
    const result = await this.pairRepository.getAll();
    const pairs = result as Pair[];
    return pairs.find((pair: Pair) => pair.name.isEqual(name)) || null;
  }
}