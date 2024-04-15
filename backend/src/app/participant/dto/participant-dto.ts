import { Dto } from "src/app/base/dto";
import { Participant } from "src/domain/entities/participant";
import { Email } from "src/domain/values/email";
import { PairId, ParticipantId, TeamId } from "src/domain/values/ids";
import { PersonName } from "src/domain/values/name";

export class ParticipantDto extends Dto<Participant> {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly teamId: string | undefined;
  public readonly pairId: string | undefined;
  public readonly enrollmentStatus: number;

  constructor(props: {
    id: string;
    name: string;
    email: string;
    teamId: string | undefined;
    pairId: string | undefined;
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
        teamId: participant.teamId ? participant.teamId.value : undefined,
        pairId: participant.pairId ? participant.pairId.value : undefined,
        enrollmentStatus: participant.enrollmentStatus,
      }
    );
  }

  get toEntity(): Participant {
    const participantId = ParticipantId.restore(this.id);
    const name = PersonName.restore(this.name);
    const email = Email.restore(this.email);
    const teamId = this.teamId != undefined ? TeamId.restore(this.teamId) : undefined;
    const pairId = this.pairId != undefined ? PairId.restore(this.pairId) : undefined;
    const enrollmentStatus = this.enrollmentStatus;

    return Participant.restore(participantId, { name, email, teamId, pairId, enrollmentStatus });
  }
}
