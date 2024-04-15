import { ApiProperty } from '@nestjs/swagger'
import { ParticipantDto } from 'src/app/participant/dto/participant-dto'
import { ParticipantResponse } from 'src/controller/participant/response/participant-response'

export class GetPairsResponse {
  @ApiProperty({ type: () => ParticipantResponse, isArray: true })
  readonly participants: ParticipantResponse[]

  public constructor(dtoParticipants: ParticipantDto[]) {
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
  }
}
