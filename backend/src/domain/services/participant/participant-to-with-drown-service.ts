import { Inject, Injectable } from "@nestjs/common";
import { IGetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { IGetPairWithFewestMembersByTeamIdQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-by-team-id-query";
import { ISavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { EntityError } from "src/domain/errors/entity_error";
import { IEnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { PairId, TeamId } from "src/domain/values/id";

export interface IParticipantToWithDrownService {
  execute(participant: Participant): Promise<void | Error>;
}

@Injectable()
export class ParticipantToWithDrownService implements IParticipantToWithDrownService {
  constructor(
    @Inject('IGetPairByIdQuery')
    private readonly getPairByIdQuery: IGetPairByIdQuery,
    @Inject('IGetPairWithFewestMembersByTeamIdQuery')
    private readonly getPairWithFewestMembersByTeamIdQuery: IGetPairWithFewestMembersByTeamIdQuery,
    @Inject('IEnrollParticipantService')
    private readonly enrollParticipantService: IEnrollParticipantService,
    @Inject('ISavePairCommand')
    private readonly savePairCommand: ISavePairCommand,
  ) { }

  async execute(participant: Participant): Promise<void | Error> {
    const pair = await this.getPairByIdQuery.execute(participant.pairId as PairId) as Pair;
    pair.changeParticipantEnrollmentStatusToWithDrawn(participant);
    if (pair.hasInsufficientMinParticipants) {
      // TODO: メール送信サービス　「どの参加者が減ったのか」「どのチームが2名以下になったのか」「そのチームの現在の参加者名」を記載する
      const smallestPair = await this.getPairWithFewestMembersByTeamIdQuery.execute(pair.teamId as TeamId) as Pair | null;
      if (smallestPair == null) {
        // TODO: 管理者にメール　「どの参加者が減ったのか」「どの参加者が合流先を探しているのか」
        throw new EntityError('参加可能なペアがありません');
      }
      const pairs = await this.enrollParticipantService.execute(smallestPair, participant) as Pair[];
      await this.savePairCommand.execute(pairs);
    }
  }
}
