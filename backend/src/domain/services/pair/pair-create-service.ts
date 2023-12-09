import { IPairRepository } from "src/domain/repositories/pair-repository";
import { Pair, PairProps } from "../../entities/pair";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { RepositoryError } from "../../errors/repository_error";
import { GetOnePairQuery } from "src/domain/commands/pair/get-one-pair-query";

export class PairCreateService {
  constructor(private readonly repo: IPairRepository) { }

  async execute(props: PairProps): Promise<Pair | EntityCreationError | RepositoryError> {
    const getOnePairQuery = new GetOnePairQuery(props.name, this.repo);
    const existingPair = await getOnePairQuery.execute();
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
