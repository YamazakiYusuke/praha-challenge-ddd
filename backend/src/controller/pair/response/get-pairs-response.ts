import { ApiProperty } from '@nestjs/swagger'
import { PairDto } from 'src/app/pair/dto/pair-dto'

export class GetPairsResponse {
  @ApiProperty()
  readonly pairs: PairData[]

  public constructor(dtoPairs: PairDto[]) {
    this.pairs = dtoPairs.map(({ id, teamId, name, participantIds }) => {
      return new PairData({
        id,
        teamId,
        name,
        participantIds
      })
    })
  }
}

class PairData {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly teamId: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly participantIds: string[];

  public constructor(params: {
    id: string
    teamId: string
    name: string
    participantIds: string[]
  }) {
    this.id = params.id;
    this.teamId = params.teamId;
    this.name = params.name;
    this.participantIds = params.participantIds;
  }
}