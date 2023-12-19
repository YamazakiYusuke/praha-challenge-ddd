import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaveTeamCommand implements ICommand<Team> {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async execute(team: Team): Promise<void | RepositoryError> {
    await this.teamRepository.save(team);
  }
}
