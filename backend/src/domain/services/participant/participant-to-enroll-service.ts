import { Inject, Injectable } from "@nestjs/common";
import { IGetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { ISavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { IEnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";

export interface IParticipantToEnrollService {
  execute(participant: Participant): Promise<void | Error>;
}

@Injectable()
export class ParticipantToEnrollService implements IParticipantToEnrollService {
  constructor(
    @Inject('IGetPairWithFewestMembersQuery')
    private readonly getPairWithFewestMembersQuery: IGetPairWithFewestMembersQuery,
    @Inject('IEnrollParticipantService')
    private readonly enrollParticipantService: IEnrollParticipantService,
    @Inject('ISavePairCommand')
    private readonly savePairCommand: ISavePairCommand,
  ) { }

  async execute(participant: Participant): Promise<void | Error> {
    const smallestPair = await this.getPairWithFewestMembersQuery.execute() as Pair | null;
    if (smallestPair == null) {
      // TODO: 管理者にメール
      throw Error('参加可能なペアがありません');
    }
    const pairs = await this.enrollParticipantService.execute(smallestPair, participant) as Pair[];
    await this.savePairCommand.execute(pairs);
  }
}
