import { ApiProperty } from "@nestjs/swagger";
import { ParticipantDto } from "src/app/participant/dto/participant-dto";

export class ParticipantRequest {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly name!: string;

  @ApiProperty()
  readonly email!: string;

  @ApiProperty()
  readonly teamId?: string;

  @ApiProperty()
  readonly pairId?: string;

  @ApiProperty()
  readonly enrollmentStatus!: number;

  public get toProps(): ParticipantDto {
    return new ParticipantDto({
      id: this.id,
      name: this.name,
      email: this.email,
      teamId: this.teamId,
      pairId: this.pairId,
      enrollmentStatus: this.enrollmentStatus
    });
  }
}