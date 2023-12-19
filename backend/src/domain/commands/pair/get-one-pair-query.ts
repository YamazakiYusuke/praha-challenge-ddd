import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Name } from "src/domain/values/name";
import { IGetOneQuery } from "../base/get-one-query";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetOnePairQuery implements IGetOneQuery<Pair, Name> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(name: Name): Promise<Pair | null | RepositoryError> {
    const result = await this.pairRepository.getAll();
    const pairs = result as Pair[];
    return pairs.find((pair: Pair) => pair.name.isEqual(name)) || null;
  }
}