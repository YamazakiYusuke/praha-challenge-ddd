import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetAllPairsQuery implements IGetQuery<Pair[]> {
  constructor(
    @inject('IPairRepository')
    private readonly pairRepository: IPairRepository
  ) { }

  async execute(): Promise<Pair[]> {
    return await this.pairRepository.getAll();
  }
}