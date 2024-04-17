import { ApiProperty } from "@nestjs/swagger";
import { AssignmentStateRequest } from "src/controller/participant/request/assignment-state-request";
import { ParticipantPaginationProps } from "src/domain/commands/participant/get-participants-paged-query";
import { AssignmentId } from "src/domain/values/ids";

export class GetParticipantsPagedRequest {
  @ApiProperty()
  readonly page!: number;

  @ApiProperty()
  readonly size!: number;

  @ApiProperty({ type: () => AssignmentStateRequest, isArray: true })
  readonly assignmentStates!: AssignmentStateRequest[];
}