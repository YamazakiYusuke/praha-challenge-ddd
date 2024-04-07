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

  constructor(participant: Participant) {
    super();
    this.id = participant.id.value;
    this.name = participant.name.value;
    this.email = participant.email.value;
    this.teamId = participant.teamId ? participant.teamId.value : undefined;
    this.pairId = participant.pairId ? participant.pairId.value : undefined;
    this.enrollmentStatus = participant.enrollmentStatus;
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
