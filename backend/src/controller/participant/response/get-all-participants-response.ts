import { ApiProperty } from '@nestjs/swagger'
import { ParticipantDto } from 'src/app/participant/dto/participant-dto'

export class GetPairsResponse {
  @ApiProperty({ type: () => ParticipantData, isArray: true })
  readonly participants: ParticipantData[]

  public constructor(dtoParticipants: ParticipantDto[]) {
    this.participants = dtoParticipants.map(({ id, name, email, teamId, pairId, enrollmentStatus }) => {
      return new ParticipantData({
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

class ParticipantData {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly teamId?: string;

  @ApiProperty()
  readonly pairId?: string;

  @ApiProperty()
  readonly enrollmentStatus: number;

  public constructor(params: {
    id: string
    name: string
    email: string
    teamId?: string
    pairId?: string
    enrollmentStatus: number
  }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.teamId = params.teamId;
    this.pairId = params.pairId;
    this.enrollmentStatus = params.enrollmentStatus;
  }
}