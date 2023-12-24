import { Injectable } from "@nestjs/common";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { IGetAllQuery } from "../base/get-all-query";

@Injectable()
export class GetAllPairsQuery implements IGetAllQuery<Pair[]> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(): Promise<Pair[] | Error> {
    return await this.pairRepository.getAll();
  }
}