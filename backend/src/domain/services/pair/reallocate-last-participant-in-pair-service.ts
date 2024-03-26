import { GetPairWithFewestMembersByTeamIdQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-by-team-id-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { GetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Transaction } from "src/domain/commands/transaction/transaction";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { ServiceError } from "src/domain/errors/service_error";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { container, injectable } from "tsyringe";

export interface IReallocateLastParticipantInPairService {
  execute(pair: Pair): Promise<void>;
}

export class ReallocateLastParticipantInPairService implements IReallocateLastParticipantInPairService {
  constructor(
    private readonly getParticipantByIdQuery: GetParticipantByIdQuery = container.resolve(GetParticipantByIdQuery),
    private readonly createPairService: CreatePairService = container.resolve(CreatePairService),
    private readonly getPairWithFewestMembersByTeamIdQuery: GetPairWithFewestMembersByTeamIdQuery = container.resolve(GetPairWithFewestMembersByTeamIdQuery),
    private readonly savePairCommand: SavePairCommand = container.resolve(SavePairCommand),
    private readonly saveParticipantCommand: SaveParticipantCommand = container.resolve(SaveParticipantCommand),
    private readonly transaction: Transaction = container.resolve(Transaction),
  ) { }

  async execute(pair: Pair): Promise<void> {
    if (!pair.hasInsufficientMinParticipants) return;

    const lastParticipantId = pair.lastParticipant;
    const lastParticipant = await this.getParticipantByIdQuery.execute(lastParticipantId) as Participant;
    const fewestPair = await this.getPairWithFewestMembersByTeamIdQuery.execute(pair.teamId, pair.id) as Pair;
    if (!fewestPair.hasValidNumberOfParticipants) {
      // TODO: 合流可能なペアがない為管理者にメール  メール文に「どの参加者が減ったのか」「どの参加者が合流先を探しているのか」を記載
      throw new ServiceError('合流可能なペアーがありません');
    }
    if (fewestPair.participantsLength == Pair.maxNumber) {
      const moverId = fewestPair.lastParticipant;
      const mover = await this.getParticipantByIdQuery.execute(moverId) as Participant;

      fewestPair.removeParticipant(moverId);
      const newPair = await this.createPairService.execute({ teamId: fewestPair.teamId, participantIds: [lastParticipantId, moverId] }) as Pair;
      lastParticipant.changeTeamIdPairId(newPair.id, newPair.teamId);
      mover.changeTeamIdPairId(newPair.id, newPair.teamId);

      await this.transaction.execute(async (tx) => {
        await this.saveParticipantCommand.execute(lastParticipant, tx);
        await this.saveParticipantCommand.execute(mover, tx);
        await this.savePairCommand.execute(fewestPair, tx);
        await this.savePairCommand.execute(newPair, tx);
      })

    } else {
      fewestPair.appendParticipant(lastParticipantId);
      lastParticipant.changeTeamIdPairId(fewestPair.id, fewestPair.teamId);

      await this.transaction.execute(async (tx) => {
        await this.saveParticipantCommand.execute(lastParticipant, tx);
        await this.savePairCommand.execute(fewestPair, tx);
      })
    }
  }
}