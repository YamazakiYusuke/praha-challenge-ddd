import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { inject, injectable } from "tsyringe";
import { ICommand } from "../base/command";

@injectable()
export class SaveTeamCommand implements ICommand<Team> {
  constructor(
    @inject('ITeamRepository')
    private readonly teamRepository: ITeamRepository
  ) { }

  async execute(team: Team, transaction?: any): Promise<void> {
    await this.teamRepository.save(team, transaction);
  }
}
