import { ApiProperty } from '@nestjs/swagger'
import { TeamDto } from 'src/app/team/dto/team-dto'
import { TeamResponse } from 'src/controller/team/response/team-response'

export class GetAllTeamsResponse {
  @ApiProperty({ type: () => TeamResponse, isArray: true })
  readonly teams: TeamResponse[]

  public constructor(dtoTeams: TeamDto[]) {
    this.teams = dtoTeams.map(({ id, name, participantIds, generationId }) => {
      return new TeamResponse({
        id: id,
        name: name,
        participantIds: participantIds,
        generationId: generationId
      })
    })
  }
}
