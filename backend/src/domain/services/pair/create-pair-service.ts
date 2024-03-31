import { GetPairsByTeamIdQuery } from "src/domain/commands/pair/get-pairs-by-team-id-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { ParticipantId, TeamId } from "src/domain/values/id";
import { PairName } from "src/domain/values/name";
import { inject, injectable } from "tsyringe";
import { debuglog } from "util";
import { Pair, PairProps } from "../../entities/pair";

@injectable()
export class CreatePairService {
  constructor(
    @inject(GetPairsByTeamIdQuery)
    private readonly getPairsByTeamIdQuery: GetPairsByTeamIdQuery,
    @inject(SavePairCommand)
    private readonly savePairCommand: SavePairCommand,
  ) { }

  async execute(props: { teamId: TeamId; participantIds: ParticipantId[]; }): Promise<Pair> {
    const name = await this.getName(props.teamId) as PairName;
    const entityProps: PairProps = {
      teamId: props.teamId,
      name: name,
      participantIds: props.participantIds,
    }
    debuglog(`entityProps: ${entityProps}`);
    const newPair = Pair.create(entityProps) as Pair;
    await this.savePairCommand.execute(newPair);
    return newPair;
  }

  private async getName(teamId: TeamId): Promise<PairName> {
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
