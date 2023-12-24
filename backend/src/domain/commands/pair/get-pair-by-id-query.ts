import { Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { Id } from "src/domain/values/id";
import { IGetOneQuery } from "../base/get-one-query";

@Injectable()
export class GetPairByIdQuery implements IGetOneQuery<Pair, Id> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(id: Id): Promise<Pair | null | Error> {
    const result = await this.pairRepository.getAll();
    const pairs = result as Pair[];
    return pairs.find((pair: Pair) => pair.getId.isEqual(id)) || null;
  }
}