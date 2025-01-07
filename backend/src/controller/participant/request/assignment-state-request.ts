import { ApiProperty } from "@nestjs/swagger";

export class AssignmentStateRequest {
  @ApiProperty()
  readonly assignmentId!: string;

  @ApiProperty()
  readonly assignmentProgressState!: number;
}
