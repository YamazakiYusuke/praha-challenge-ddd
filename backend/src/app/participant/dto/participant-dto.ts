import { Dto } from "src/app/base/dto";
import { Participant } from "src/domain/entities/participant";
import { Email } from "src/domain/values/email";
import { PairId, ParticipantId, TeamId } from "src/domain/values/ids";
import { PersonName } from "src/domain/values/name";

export class ParticipantDto extends Dto<Participant> {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly teamId: string | null;
  public readonly pairId: string | null;
  public readonly enrollmentStatus: number;

  constructor(props: {
    id: string;
    name: string;
    email: string;
    teamId: string | null;
    pairId: string | null;
    enrollmentStatus: number;
  }) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.teamId = props.teamId;
    this.pairId = props.pairId;
    this.enrollmentStatus = props.enrollmentStatus;
  }

  static fromEntity(participant: Participant): ParticipantDto {
    return new ParticipantDto(
      {
        id: participant.id.value,
        name: participant.name.value,
        email: participant.email.value,
        teamId: participant.teamId ? participant.teamId.value : null,
        pairId: participant.pairId ? participant.pairId.value : null,
        enrollmentStatus: participant.enrollmentStatus,
      }
    );
  }

  get toEntity(): Participant {
    const participantId = ParticipantId.restore(this.id);
    const name = PersonName.restore(this.name);
    const email = Email.restore(this.email);
    const teamId = this.teamId != null ? TeamId.restore(this.teamId) : null;
    const pairId = this.pairId != null ? PairId.restore(this.pairId) : null;
    const enrollmentStatus = this.enrollmentStatus;

    return Participant.restore(participantId, { name, email, teamId, pairId, enrollmentStatus });
  }
}
