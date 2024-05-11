import { ApiProperty } from "@nestjs/swagger";

export class ParticipantResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly teamId: string | null;

  @ApiProperty()
  readonly pairId: string | null;

  @ApiProperty()
  readonly enrollmentStatus: number;

  public constructor(params: {
    id: string
    name: string
    email: string
    teamId: string | null
    pairId: string | null
    enrollmentStatus: number
  }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.teamId = params.teamId;
    this.pairId = params.pairId;
    this.enrollmentStatus = params.enrollmentStatus;
  }
}