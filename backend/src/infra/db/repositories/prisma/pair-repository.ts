import { Prisma, PrismaClient } from "@prisma/client";
import { Pair } from "src/domain/entities/pair";
import { IPairRepository } from "src/domain/repositories/pair-repository";
import { PairId, ParticipantId, TeamId } from "src/domain/values/id";
import { PairName } from "src/domain/values/name";

export class PrismaPairRepository implements IPairRepository {
  private readonly prisma = new PrismaClient();

  async save(pair: Pair, tx?: Prisma.TransactionClient): Promise<void | Error> {
    const prismaClient = tx ?? this.prisma;
    await prismaClient.pair.upsert({
      where: { id: pair.id.value },
      update: {
        name: pair.name.value,
        teamId: pair.teamId.value,
        participants: {
          connect: pair.participantIds.map(participantId => ({ id: participantId.value })),
        },
      },
      create: {
        id: PairId.create().value,
        name: pair.name.value,
        teamId: pair.teamId.value,
        participants: {
          connect: pair.participantIds.map(participantId => ({ id: participantId.value })),
        },
      },
    });
  }

  async getAll(): Promise<Pair[] | Error> {
    const pairsData = await this.prisma.pair.findMany({
      select: {
        id: true,
        name: true,
        teamId: true,
        participants: {
          select: {
            id: true,
          },
        },
      },
    });

    return pairsData.map(data => 
      Pair.restore(
        PairId.restore(data.id),
        {
          name: PairName.restore(data.name),
          teamId: TeamId.restore(data.teamId),
          participantIds: data.participants.map(participant => ParticipantId.restore(participant.id)),
        }
      )
    );
  }
}
