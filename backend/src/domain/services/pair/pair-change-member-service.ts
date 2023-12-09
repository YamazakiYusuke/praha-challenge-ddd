import { IPairRepository } from "src/domain/repositories/pair-repository";
import { Pair, PairProps } from "../../entities/pair";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { RepositoryError } from "../../errors/repository_error";

export class PairChangeMemberService {
  constructor(private readonly repo: IPairRepository) { }

  async execute(props: PairProps): Promise<Pair | EntityCreationError | RepositoryError> {
    // TODO
  }
}
