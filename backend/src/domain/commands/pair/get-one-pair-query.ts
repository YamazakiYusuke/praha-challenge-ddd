import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Name } from "src/domain/values/name";
import { IGetOneQuery } from "../base/get-one-query";

export class GetOnePairQuery implements IGetOneQuery<Pair> {
  constructor(private name: Name, private pairRepository: IPairRepository) { }

  async execute(): Promise<Pair | null | RepositoryError> {
    return await this.pairRepository.get(this.name);
  }
}