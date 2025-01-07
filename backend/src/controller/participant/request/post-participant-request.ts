import { ApiProperty } from "@nestjs/swagger";

export class PostParticipantRequest {
  @ApiProperty()
  readonly name!: string;

  @ApiProperty()
  readonly email!: string;
}