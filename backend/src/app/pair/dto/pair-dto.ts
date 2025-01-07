import { Dto } from "src/app/base/dto";
import { Pair } from "src/domain/entities/pair";
import { PairId, ParticipantId, TeamId } from "src/domain/values/ids";
import { PairName } from "src/domain/values/name";

export class PairDto extends Dto<Pair> {
  public readonly id: string;
  public readonly teamId: string;
  public readonly name: string;
  public readonly participantIds: string[];

  constructor(pair: Pair) {
    super();
    this.id = pair.id.value;
    this.teamId = pair.teamId.value;
    this.name = pair.name.value;
    this.participantIds = pair.participantIds.map(id => id.value);
  }

  get toEntity(): Pair {
    return Pair.restore(PairId.restore(this.id), {
      teamId: TeamId.restore(this.teamId),
      name: PairName.restore(this.name),
      participantIds: this.participantIds.map((participantId) => ParticipantId.restore(participantId))
    })
  }
}
