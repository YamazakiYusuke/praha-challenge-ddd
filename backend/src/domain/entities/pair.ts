import { PairName } from "src/domain/values/name";
import { PairId, ParticipantId, TeamId } from "../values/id";
import { Entity } from "./base/entity";
import { Participant } from "./participant";
import { validateProps } from "./utils/validate-props";
import { EntityError } from "src/domain/errors/entity_error";

export interface PairProps {
  teamId: TeamId;
  name: PairName;
  participantIds: ParticipantId[];
}

export class Pair extends Entity<PairId, PairProps> {
  static readonly maxNumber = 3;
  static readonly minNumber = 2;
  private constructor(id: PairId, props: PairProps) {
    validateProps(id, props);
    super(id, props)
  }
  /// Factory
  static create(props: PairProps): Pair | Error {
    const pair = new Pair(PairId.create(), props);
    return pair;
  }

  static restore(id: PairId, props: PairProps): Pair {
    return new Pair(id, props)
  }

  /// Getter
  public get teamId(): TeamId {
    return this.props.teamId;
  }

  public get name(): PairName {
    return this.props.name;
  }

  public get participantIds(): ParticipantId[] {
    return this.props.participantIds;
  }

  public get lastParticipant(): ParticipantId {
    return this.participantIds[this.participantIds.length - 1] as ParticipantId;
  }

  public get participantsLength(): number {
    return this.participantIds.length;
  }

  public get hasValidNumberOfParticipants(): boolean {
    return this.participantsLength >= Pair.minNumber && this.participantsLength <= Pair.maxNumber;
  }

  public get hasExceededMaxParticipants(): boolean {
    return this.participantsLength > Pair.maxNumber;
  }

  public get hasInsufficientMinParticipants(): boolean {
    return this.participantsLength < Pair.minNumber;
  }

  /// Method
  public participantIndexAt(index: number): ParticipantId | null {
    return this.participantIds[index] ?? null;
  }

  /**
   * Pairに所属している参加者を在籍状態にする
   * @param participant 
   */
  public appendParticipant(participantId: ParticipantId): void | Error {
    if (this.participantIds.includes(participantId)) {
      throw new EntityError("Participant ID already exists in the pair.");
    }
    this.participantIds.push(participantId);
  }

  /**
   * Pairに所属している参加者を取り除く
   * @param participant 
   */
  public removeParticipant(participantId: ParticipantId): void | Error {
    if (!this.participantIds.includes(participantId)) {
      throw new EntityError("Participant ID does not exist in the pair.");
    }
    this.props.participantIds = this.participantIds.filter(id => id !== participantId);
  }
}
