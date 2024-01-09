import { Injectable } from "@nestjs/common";
import { GetPairsByTeamIdQuery } from "src/domain/commands/pair/get-pairs-by-team-id-query copy";
import { Participants } from "src/domain/entities/participants";
import { Id, TeamId } from "src/domain/values/id";
import { PairName } from "src/domain/values/name";
import { Pair, PairProps } from "../../entities/pair";

@Injectable()
export class CreatePairService {
  constructor(private readonly getPairsByTeamIdQuery: GetPairsByTeamIdQuery) { }

  async execute(props: { teamId: TeamId; participants: Participants; }): Promise<Pair | Error> {
    const name = await this.getName(props.teamId) as PairName;
    const entityProps: PairProps = {
      teamId: props.teamId,
      name: name,
      participants: props.participants,
    }
    const newPair = Pair.create(entityProps);
    return newPair;
  }

  private async getName(teamId: TeamId): Promise<PairName | Error> {
    const allPairNames = await (this.getPairsByTeamIdQuery.execute(teamId)) as Pair[];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < alphabet.length; i++) {
      const potentialName = alphabet[i];
      if (!allPairNames.some(pair => pair.name.isEqual(potentialName))) {
        return PairName.create(potentialName as string) as PairName;
      }
    }
    throw new Error('All pair names are taken.');
  }
}
