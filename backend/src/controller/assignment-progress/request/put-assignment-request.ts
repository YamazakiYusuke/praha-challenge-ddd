import { ApiProperty } from "@nestjs/swagger";

export class PutAssignmentProgressRequest {
  @ApiProperty()
  readonly id!: string;
  @ApiProperty()
  readonly assignmentProgressState!: number;

}
