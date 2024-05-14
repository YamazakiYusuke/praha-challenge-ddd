import { EntityError } from "src/domain/errors/entity_error";
import { PairName } from "src/domain/values/name";
import { PairId, ParticipantId, TeamId } from "../values/ids";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface PairProps {
  readonly teamId: TeamId;
  readonly name: PairName;
  readonly participantIds: ParticipantId[];
}

export class Pair extends Entity<PairId, PairProps> {
  static readonly maxNumber = 3;
  static readonly minNumber = 2;
  private constructor(id: PairId, props: PairProps) {
    validateProps(id, props);
    super(id, props)
  }
  /// Factory
  static create(props: PairProps): Pair {
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

  /**
   * メンバー数が正常(2人以上3人以下)な場合、trueをreturn
   */
  public get hasValidNumberOfParticipants(): boolean {
    return this.participantsLength >= Pair.minNumber && this.participantsLength <= Pair.maxNumber;
  }

  /**
   * メンバー数が多すぎる(4人以上)場合、trueをreturn
   */
  public get hasExceededMaxParticipants(): boolean {
    return this.participantsLength > Pair.maxNumber;
  }

  /**
   * メンバー数がすくなすぎる(1人以下)場合、trueをreturn
   */
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
  public appendParticipant(participantId: ParticipantId): void {
    if (this.includesParticipantId(participantId)) {
      throw new EntityError("Participant ID already exists in the pair.");
    }
    this.participantIds.push(participantId);
  }

  /**
   * Pairに所属している参加者を取り除く
   * @param participant 
   */
  public removeParticipant(participantId: ParticipantId): void {
    if (!this.includesParticipantId(participantId)) {
      throw new EntityError("Participant ID does not exist in the pair.");
    }
    const newParticipantIds = this.participantIds.filter(id => !id.isEqual(participantId));
    const newProps = { ...this.props, participantIds: newParticipantIds };
    this.setProps(newProps);
  }

  private includesParticipantId(participantId: ParticipantId): boolean {
    return this.participantIds.some(id => id.isEqual(participantId));
  }
}
