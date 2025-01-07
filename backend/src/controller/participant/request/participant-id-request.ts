import { ApiProperty } from "@nestjs/swagger";

export class ParticipantIdRequest {
  @ApiProperty()
  readonly id!: string;
}