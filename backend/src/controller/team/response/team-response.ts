import { ApiProperty } from "@nestjs/swagger";

export class TeamResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly participantIds: string[];

  @ApiProperty()
  readonly generationId: string;

  public constructor(params: {
    id: string
    name: string
    participantIds: string[]
    generationId: string
  }) {
    this.id = params.id;
    this.name = params.name;
    this.participantIds = params.participantIds;
    this.generationId = params.generationId;
  }
}