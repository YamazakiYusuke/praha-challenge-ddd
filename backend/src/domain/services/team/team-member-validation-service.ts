import { Inject, Injectable } from "@nestjs/common";
import { IGetTeamByIdQuery } from "src/domain/commands/team/get-team-by-id-query";
import { Team } from "src/domain/entities/team";
import { TeamId } from "src/domain/values/id";

export interface ITeamMemberValidationService {
  execute(teamId: TeamId): Promise<void>;
}

@Injectable()
export class TeamMemberValidationService implements ITeamMemberValidationService {
  constructor(
    @Inject('IGetTeamByIdQuery')
    private readonly getTeamByIdQuery: IGetTeamByIdQuery,
  ) { }

  async execute(teamId: TeamId): Promise<void> {
    const team = await this.getTeamByIdQuery.execute(teamId) as Team;
  }
}