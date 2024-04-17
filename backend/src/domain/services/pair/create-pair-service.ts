import { GetPairsByTeamIdQuery } from "src/domain/commands/pair/get-pairs-by-team-id-query";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { ParticipantId, TeamId } from "src/domain/values/ids";
import { PairName } from "src/domain/values/name";
import { inject, injectable } from "tsyringe";
import { Pair, PairProps } from "../../entities/pair";

@injectable()
export class CreatePairService {
  constructor(
    @inject(GetPairsByTeamIdQuery)
    private readonly getPairsByTeamIdQuery: GetPairsByTeamIdQuery,
  ) { }

  async execute(props: { teamId: TeamId; participantIds: ParticipantId[]; }): Promise<Pair> {
    const name = await this.getName(props.teamId) as PairName;
    const entityProps: PairProps = {
      teamId: props.teamId,
      name: name,
      participantIds: props.participantIds,
    }
    const newPair = Pair.create(entityProps) as Pair;
    return newPair;
  }

  private async getName(teamId: TeamId): Promise<PairName> {
    const allPairs = await this.getPairsByTeamIdQuery.execute(teamId);
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < alphabet.length; i++) {
      const potentialName = alphabet[i];
      if (!allPairs.some(pair => pair.name.value == potentialName)) {
        return PairName.create(potentialName as string) as PairName;
      }
    }
    throw new DomainServiceError('All pair names are taken.');
  }
}
