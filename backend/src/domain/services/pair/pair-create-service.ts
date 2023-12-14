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

@Injectable()
export class PairCreateService {
  constructor(private readonly getPairsByTeamIdQuery: GetPairsByTeamIdQuery, private readonly getOnePairQuery: GetOnePairQuery) { }

  async execute(props: { teamId: Id; name?: Name; participants: Participants; }): Promise<Pair | EntityCreationError | RepositoryError> {
    let nonNullName: Name;
    if (props.name) {
      const existingPair = await this.getOnePairQuery.execute(props.name);
      if (existingPair != null) {
        throw new EntityCreationError('このペア名は既に存在しています');
      }
      nonNullName = props.name;
    } else {
      const stringName = await (this.getNewPairName(props.teamId));
      nonNullName = Name.create(stringName as string) as Name;
    }
    const entityProps: PairProps = {
      teamId: props.teamId,
      name: nonNullName,
      participants: props.participants,
    }
    const newPair = Pair.create(entityProps);
    return newPair;
  }

  private async  getNewPairName(teamId: Id): Promise<String | RepositoryError | EntityModificationError> {
    const allPairNames = await (this.getPairsByTeamIdQuery.execute(teamId)) as Pair[];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < alphabet.length; i++) {
      const potentialName = alphabet[i];
      if (!allPairNames.some(pair => pair.name.isEqual(potentialName))) {
        return potentialName as String;
      }
    }
    throw new EntityModificationError('All pair names are taken.');
  }
}
