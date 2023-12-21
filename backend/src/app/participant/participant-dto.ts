import { Participant } from "src/domain/entities/participant";

export class ParticipantDTO {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly teamId?: string;
  public readonly pairId?: string;
  public readonly enrollmentStatus: string;
  public constructor(participant: Participant) {
    this.id = participant.getId.value
    this.name = participant.name.value
    this.email = participant.email.value
    this.teamId = participant.teamId?.value
    this.pairId = participant.pairId?.value
    this.enrollmentStatus = participant.enrollmentStatus
  }
}
