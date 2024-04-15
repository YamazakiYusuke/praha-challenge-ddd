import { ApiProperty } from "@nestjs/swagger";

export class PairResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly teamId: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly participantIds: string[];

  public constructor(params: {
    id: string
    teamId: string
    name: string
    participantIds: string[]
  }) {
    this.id = params.id;
    this.teamId = params.teamId;
    this.name = params.name;
    this.participantIds = params.participantIds;
  }
}