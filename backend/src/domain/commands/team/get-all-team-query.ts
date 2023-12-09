import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { IGetAllQuery } from "../base/get-all-query";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllTeamsQuery implements IGetAllQuery<Team[]> {
  constructor(private teamRepository: ITeamRepository) { }

  async execute(): Promise<Team[] | RepositoryError> {
    return await this.teamRepository.getAll();
  }
}
