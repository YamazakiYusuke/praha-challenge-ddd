import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Name } from "src/domain/values/name";
import { IGetOneQuery } from "../base/get-one-query";
import { Injectable } from "@nestjs/common";
import { Id } from "src/domain/values/id";

@Injectable()
export class GetOnePairQuery implements IGetOneQuery<Pair, Name | undefined> {
  constructor(private pairRepository: IPairRepository) { }

  async execute(teamId: Id | undefined): Promise<Pair | null | RepositoryError> {
    if (teamId instanceof Id) {

    } else {

    }
  }
}