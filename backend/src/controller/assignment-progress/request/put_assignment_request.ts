import { ApiProperty } from "@nestjs/swagger";

export class PutAssignmentProgressRequest {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly assignmentId!: string;

  @ApiProperty()
  readonly participantId!: string;

  @ApiProperty()
  readonly assignmentProgressState!: number;

  @ApiProperty()
  readonly newState!: number;
}
