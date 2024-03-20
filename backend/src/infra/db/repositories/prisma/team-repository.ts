import { Prisma, PrismaClient } from "@prisma/client";
import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { ParticipantId, TeamId } from "src/domain/values/id";
import { TeamName } from "src/domain/values/name";

export class PrismaTeamRepository implements ITeamRepository {
  private readonly prisma = new PrismaClient();

  async save(team: Team, tx?: Prisma.TransactionClient): Promise<void | Error> {
    const prismaClient = tx ?? this.prisma;
    await prismaClient.team.upsert({
      where: {
        id: team.id.value,
      },
      update: {
        name: team.name.value,
      },
      create: {
        id: team.id.value,
        name: team.name.value,
      }
    });
  }

  async getAll(): Promise<Team[] | Error> {
    const rowData = await this.prisma.team.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        pairs: {
          select: {
            participants: {
              select: {
                id: true
              }
            }
          }
        }
      }
    });
    return rowData.map(data => {
      const participantIds = data.pairs.flatMap(pair =>
        pair.participants.map(participant =>
          ParticipantId.restore(participant.id)
        )
      );

      return Team.restore(
        TeamId.restore(data.id),
        {
          name: TeamName.restore(data.name),
          participantIds,
        }
      );
    });
  }
}

