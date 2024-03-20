import { Prisma } from "@prisma/client";
import { Team } from "../entities/team";

export interface ITeamRepository {
  save(team: Team, tx?: Prisma.TransactionClient): Promise<void | Error>
  getAll(): Promise<Team[] | Error>
}