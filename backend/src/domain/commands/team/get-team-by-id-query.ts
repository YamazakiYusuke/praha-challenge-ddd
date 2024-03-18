import { Inject, Injectable } from "@nestjs/common";
import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { TeamId } from "src/domain/values/id";
import { IGetQuery } from "../base/get-query";

export interface IGetTeamByIdQuery extends IGetQuery<Team, TeamId> {
  execute(id: TeamId): Promise<Team | null | Error>;
}

@Injectable()
export class GetTeamByIdQuery implements IGetTeamByIdQuery {
  constructor(
    @Inject('ITeamRepository')
    private readonly teamRepository: ITeamRepository
  ) { }

  async execute(id: TeamId): Promise<Team | null | Error> {
    const teams = await this.teamRepository.getAll() as Team[];
    return teams.find((team: Team) => team.id.isEqual(id)) || null;
  }
}