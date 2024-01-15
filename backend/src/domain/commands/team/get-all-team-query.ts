import { Injectable } from "@nestjs/common";
import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetAllTeamsQuery implements IGetQuery<Team[]> {
  constructor(private readonly teamRepository: ITeamRepository) { }

  async execute(): Promise<Team[] | Error> {
    return await this.teamRepository.getAll();
  }
}
