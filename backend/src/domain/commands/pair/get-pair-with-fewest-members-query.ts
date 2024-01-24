import { Inject, Injectable } from "@nestjs/common";
import { IGetQuery } from "src/domain/commands/base/get-query";
import { Pair } from "src/domain/entities/pair";
import { CommandError } from "src/domain/errors/command_error";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { createRandomNumUpTo } from "src/util/random";

export interface IGetPairWithFewestMembersQuery extends IGetQuery<Pair, undefined> {
  execute(): Promise<Pair | null | Error>;
}

@Injectable()
export class GetPairWithFewestMembersQuery implements IGetPairWithFewestMembersQuery {
  constructor(
    @Inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(): Promise<Pair | null | Error> {
    const result = await this.pairRepository.getAll();
    const allPairs = result as Pair[];
    if (allPairs.length === 0) return null;
    return allPairs[createRandomNumUpTo(allPairs.length)] as Pair;
  }
}