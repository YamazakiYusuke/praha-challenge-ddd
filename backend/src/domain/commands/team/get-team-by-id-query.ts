import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { TeamId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetTeamByIdQuery implements IGetQuery<Team, TeamId> {
  constructor(
    @inject('ITeamRepository')
    private readonly teamRepository: ITeamRepository
  ) { }

  async execute(id: TeamId): Promise<Team | null> {
    const teams = await this.teamRepository.getAll();
    return teams.find((team: Team) => team.id.isEqual(id)) || null;
  }
}