import { IPairRepository } from "src/domain/repositories/pair-repository";
import { Pair, PairProps } from "../../entities/pair";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { RepositoryError } from "../../errors/repository_error";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PairChangeMemberService {
  constructor(private readonly repo: IPairRepository) { }

  // async execute(props: PairProps): Promise<Pair | EntityCreationError | RepositoryError> {
  //   // TODO: メンバーの在籍状況を変更する関数の実装後に実装
  // }
}
