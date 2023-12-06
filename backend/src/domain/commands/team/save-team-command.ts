import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";

export class SaveTeamCommand implements ICommand {
  constructor(private team: Team, private teamRepository: ITeamRepository) {}

  async execute(): Promise<void | RepositoryError> {
    await this.teamRepository.save(this.team);
  }
}
