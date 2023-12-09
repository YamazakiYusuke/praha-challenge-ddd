import { Pair, PairProps } from "../../entities/pair";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { RepositoryError } from "../../errors/repository_error";
import { GetOnePairQuery } from "src/domain/commands/pair/get-one-pair-query";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PairCreateService {
  constructor(private readonly getOnePairQuery: GetOnePairQuery) { }

  async execute(props: PairProps): Promise<Pair | EntityCreationError | RepositoryError> {
    const existingPair = await this.getOnePairQuery.execute(props.name);
    if (existingPair instanceof RepositoryError) {
      throw existingPair;
    }
    if (existingPair != null) {
      throw new EntityCreationError('このペア名は既に存在しています');
    }
    const newPair = Pair.create(props);
    return newPair;
  }
}
