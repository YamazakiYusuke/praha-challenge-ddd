import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { IGetAllQuery } from "../base/get-all-query";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllPairsQuery implements IGetAllQuery<Pair[]> {
  constructor(private readonly pairRepository: IPairRepository) { }

  async execute(): Promise<Pair[] | RepositoryError> {
    return await this.pairRepository.getAll();
  }
}