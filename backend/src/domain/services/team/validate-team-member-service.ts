import { GetTeamByIdQuery } from "src/domain/commands/team/get-team-by-id-query";
import { Team } from "src/domain/entities/team";
import { TeamId } from "src/domain/values/id";
import { container } from "tsyringe";

export interface IValidateTeamMemberService {
  execute(teamId: TeamId): Promise<void>;
}

export class ValidateTeamMemberService implements IValidateTeamMemberService {
  constructor(
    private readonly getTeamByIdQuery: GetTeamByIdQuery = container.resolve(GetTeamByIdQuery),
  ) { }

  async execute(teamId: TeamId): Promise<void> {
    const team = await this.getTeamByIdQuery.execute(teamId) as Team;
    // teamメンバー数の確認
  }
}