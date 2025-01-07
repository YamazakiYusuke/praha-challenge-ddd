import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetAllTeamsQuery implements IGetQuery<Team[]> {
  constructor(
    @inject('ITeamRepository')
    private readonly teamRepository: ITeamRepository
  ) { }

  async execute(): Promise<Team[]> {
    return await this.teamRepository.getAll();
  }
}
