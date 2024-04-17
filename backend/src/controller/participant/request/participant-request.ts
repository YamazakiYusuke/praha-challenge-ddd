import { ApiProperty } from "@nestjs/swagger";

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
}