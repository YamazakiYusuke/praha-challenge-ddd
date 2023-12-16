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
export class PairCreateService {
  constructor(private readonly getPairsByTeamIdQuery: GetPairsByTeamIdQuery, private readonly getOnePairQuery: GetOnePairQuery) { }

  async execute(props: { teamId: Id; participants: Participants; }): Promise<Pair | EntityCreationError | RepositoryError> {
    const name = await (this.getNewPairName(props.teamId)) as Name;
    const entityProps: PairProps = {
      teamId: props.teamId,
      name: name,
      participants: props.participants,
    }
    const newPair = Pair.create(entityProps);
    return newPair;
  }

  private async getNewPairName(teamId: Id): Promise<Name | RepositoryError | EntityModificationError | ValueCreationError> {
    const allPairNames = await (this.getPairsByTeamIdQuery.execute(teamId)) as Pair[];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < alphabet.length; i++) {
      const potentialName = alphabet[i];
      if (!allPairNames.some(pair => pair.name.isEqual(potentialName))) {
        return Name.create(potentialName as string) as Name;
      }
    }
    throw new EntityModificationError('All pair names are taken.');
  }
}
