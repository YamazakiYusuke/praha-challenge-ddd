import { ApiProperty } from "@nestjs/swagger";
import { AssignmentStateRequest } from "src/controller/participant/request/assignment-state-request";

export class GetParticipantsPagedRequest {
  @ApiProperty({ example: 1, description: 'Start from 1' })
  readonly page!: number;

  @ApiProperty({ example: 10 })
  readonly size!: number;

  @ApiProperty({ type: () => AssignmentStateRequest, isArray: true, example: [{ assignmentId: '1', assignmentProgressState: 0 }] })
  readonly assignmentStates!: AssignmentStateRequest[];
}