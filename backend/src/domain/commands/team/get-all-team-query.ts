import { Injectable, Inject } from "@nestjs/common";
import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { IGetQuery } from "../base/get-query";

export interface IGetAllTeamsQuery extends IGetQuery<Team[]> {
  execute(): Promise<Team[] | Error>;
}

@Injectable()
export class GetAllTeamsQuery implements IGetAllTeamsQuery {
  constructor(
    @Inject('ITeamRepository')
    private readonly teamRepository: ITeamRepository
  ) { }

  async execute(): Promise<Team[] | Error> {
    return await this.teamRepository.getAll();
  }
}
