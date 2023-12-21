import { Pair, PairProps } from "../../entities/pair";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { RepositoryError } from "../../errors/repository_error";
import { GetOnePairQuery } from "src/domain/commands/pair/get-one-pair-query";
import { Injectable } from "@nestjs/common";
import { Id } from "src/domain/values/id";
import { Name } from "src/domain/values/name";
import { Participants } from "src/domain/values/participants";
import { GetPairsByTeamIdQuery } from "src/domain/commands/pair/get-pairs-by-team-id-query copy";
import { EntityModificationError } from "src/domain/errors/entity_modification_error";
import { ValueCreationError } from "src/domain/errors/value_creation_error";

@Injectable()
export class CreatePairService {
  constructor(private readonly getOnePairQuery: GetOnePairQuery) { }

  async execute(props: { teamId: Id; name: Name; participants: Participants; }): Promise<Pair | EntityCreationError | RepositoryError> {
    const entityProps: PairProps = {
      teamId: props.teamId,
      name: props.name,
      participants: props.participants,
    }
    const newPair = Pair.create(entityProps);
    return newPair;
  }
}
