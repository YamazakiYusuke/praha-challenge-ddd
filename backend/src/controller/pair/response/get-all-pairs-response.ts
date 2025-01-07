import { ApiProperty } from '@nestjs/swagger'
import { PairDto } from 'src/app/pair/dto/pair-dto'
import { PairResponse } from 'src/controller/pair/response/pair-response'

export class GetAllPairsResponse {
  @ApiProperty({ type: () => PairResponse, isArray: true })
  readonly pairs: PairResponse[]

  public constructor(dtoPairs: PairDto[]) {
    this.pairs = dtoPairs.map(({ id, teamId, name, participantIds }) => {
      return new PairResponse({
        id: id,
        teamId: teamId,
        name: name,
        participantIds: participantIds
      })
    })
  }
}
