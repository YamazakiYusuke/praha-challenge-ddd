import { Inject, Injectable } from "@nestjs/common";
import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { ICommand } from "../base/command";

export interface ISaveTeamCommand extends ICommand<Team> {
  execute(team: Team, transaction?: any): Promise<void>;
}

@Injectable()
export class SaveTeamCommand implements ISaveTeamCommand {
  constructor(
    @Inject('ITeamRepository')
    private readonly teamRepository: ITeamRepository
  ) { }

  async execute(team: Team, transaction?: any): Promise<void> {
    await this.teamRepository.save(team, transaction);
  }
}
