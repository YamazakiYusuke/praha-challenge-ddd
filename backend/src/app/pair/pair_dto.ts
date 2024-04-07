import { Pair } from "src/domain/entities/pair";

export class PairDto {
  public readonly id: string;
  public readonly teamId: string;
  public readonly name: string;
  public readonly participantIds: string[];

  constructor(pair: Pair) {
    this.id = pair.id.value;
    this.teamId = pair.teamId.value;
    this.name = pair.name.value;
    this.participantIds = pair.participantIds.map(id => id.value);
  }
}
