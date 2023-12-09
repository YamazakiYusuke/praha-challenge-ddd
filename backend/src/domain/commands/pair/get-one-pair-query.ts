import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Name } from "src/domain/values/name";
import { IGetOneQuery } from "../base/get-one-query";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetOnePairQuery implements IGetOneQuery<Pair, Name> {
  constructor(private pairRepository: IPairRepository) { }

  async execute(name: Name): Promise<Pair | null | RepositoryError> {
    return await this.pairRepository.get(name);
  }
}