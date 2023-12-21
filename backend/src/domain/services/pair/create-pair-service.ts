import { Pair, PairProps } from "../../entities/pair";
import { GetPairsByTeamIdQuery } from "src/domain/commands/pair/get-pairs-by-team-id-query copy";
import { Injectable } from "@nestjs/common";
import { Id } from "src/domain/values/id";
import { Name } from "src/domain/values/name";
import { Participants } from "src/domain/values/participants";

@Injectable()
export class CreatePairService {
  constructor(private readonly getPairsByTeamIdQuery: GetPairsByTeamIdQuery) { }

  async execute(props: { teamId: Id; participants: Participants; }): Promise<Pair | Error> {
    const name = await this.getName(props.teamId) as Name;
    const entityProps: PairProps = {
      teamId: props.teamId,
      name: name,
      participants: props.participants,
    }
    const newPair = Pair.create(entityProps);
    return newPair;
  }

  private async getName(teamId: Id): Promise<Name | Error> {
    const allPairNames = await (this.getPairsByTeamIdQuery.execute(teamId)) as Pair[];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < alphabet.length; i++) {
      const potentialName = alphabet[i];
      if (!allPairNames.some(pair => pair.name.isEqual(potentialName))) {
        return Name.create(potentialName as string) as Name;
      }
    }
    throw new Error('All pair names are taken.');
  }
}
