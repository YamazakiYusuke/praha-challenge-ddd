import { Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetAllPairsQuery implements IGetQuery<Pair[]> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(): Promise<Pair[] | Error> {
    return await this.pairRepository.getAll();
  }
}