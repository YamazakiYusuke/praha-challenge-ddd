import { Inject, Injectable } from "@nestjs/common";
import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { TeamId } from "src/domain/values/id";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetTeamByIdQuery implements IGetQuery<Team, TeamId> {
  constructor(
    @Inject('ITeamRepository')
    private readonly teamRepository: ITeamRepository
  ) { }

  async execute(id: TeamId): Promise<Team | null> {
    const teams = await this.teamRepository.getAll();
    return teams.find((team: Team) => team.id.isEqual(id)) || null;
  }
}