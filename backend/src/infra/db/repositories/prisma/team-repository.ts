import { Prisma, PrismaClient } from "@prisma/client";
import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";
import { ParticipantId, TeamId } from "src/domain/values/id";
import { TeamName } from "src/domain/values/name";

export class PrismaTeamRepository implements ITeamRepository {
  private readonly prisma = new PrismaClient();

  async save(team: Team, transaction?: Prisma.TransactionClient): Promise<void | Error> {
    const prismaClient = transaction ?? this.prisma;
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
        generationId: team.generationId,
      }
    });
  }

  async getAll(): Promise<Team[] | Error> {
    const teams = await this.prisma.team.findMany({
      include: {
        pairs: {
          include: {
            participants: true,
          }
        },
      }
    });
    return teams.map(team => {
      const participantIds = team.pairs.flatMap(pair =>
        pair.participants.map(participant =>
          ParticipantId.restore(participant.id)
        )
      );

      return Team.restore(
        TeamId.restore(team.id),
        {
          name: TeamName.restore(team.name),
          participantIds: participantIds,
          generationId: team.generationId,
        }
      );
    });
  }
}

