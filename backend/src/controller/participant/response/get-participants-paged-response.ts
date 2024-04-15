import { ApiProperty } from '@nestjs/swagger';
import { ParticipantDto } from 'src/app/participant/dto/participant-dto';
import { AssignmentStateRequest } from 'src/controller/participant/request/assignment-state-request';
import { GetParticipantsPagedRequest } from 'src/controller/participant/request/get-participants-paged-request copy';
import { ParticipantResponse } from 'src/controller/participant/response/participant-response';

export class GetParticipantsPagedResponse {
  @ApiProperty({ type: () => ParticipantResponse, isArray: true })
  readonly participants: ParticipantResponse[]

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly size: number;

  @ApiProperty({ type: () => AssignmentStateRequest, isArray: true })
  readonly assignmentStates: AssignmentStateRequest[];

  public constructor(dtoParticipants: ParticipantDto[], getParticipantsPagedRequest: GetParticipantsPagedRequest) {
    this.participants = dtoParticipants.map(({ id, name, email, teamId, pairId, enrollmentStatus }) => {
      return new ParticipantResponse({
        id: id,
        name: name,
        email: email,
        teamId: teamId,
        pairId: pairId,
        enrollmentStatus: enrollmentStatus
      })
    })
    this.page = getParticipantsPagedRequest.page;
    this.size = getParticipantsPagedRequest.size;
    this.assignmentStates = getParticipantsPagedRequest.assignmentStates;
  }
}
