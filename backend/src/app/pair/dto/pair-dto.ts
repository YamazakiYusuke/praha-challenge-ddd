import { Pair } from "src/domain/entities/pair";
import { ParticipantDTO } from "../../participant/dto/participant-dto";

export class PairDTO {
  public readonly id: string
  public readonly teamId: string;
  public readonly name: string;
  public readonly participants: ParticipantDTO[];
  constructor(pair: Pair) {
    this.id = pair.id.value
    this.teamId = pair.teamId.value
    this.name = pair.name.value
    this.participants = pair.participants.value.map(e => new ParticipantDTO(e));
  }
}