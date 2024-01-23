import { Injectable, Inject } from "@nestjs/common";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { IGetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { ISavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { IGetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { IEnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { ParticipantId } from "src/domain/values/id";
import { debuglog } from "util";

@Injectable()
export class ParticipantToEnrollUseCase {
  constructor(
    @Inject('IGetParticipantByIdQuery')
    private readonly getParticipantByIdQuery: IGetParticipantByIdQuery,
    @Inject('IGetPairWithFewestMembersQuery')
    private readonly getPairWithFewestMembersQuery: IGetPairWithFewestMembersQuery,
    @Inject('IEnrollParticipantService')
    private readonly enrollParticipantService: IEnrollParticipantService,
    @Inject('ISavePairCommand')
    private readonly savePairCommand: ISavePairCommand,
  ) { }

  // Teamの更新
  async execute(participantId: ParticipantId): Promise<SuccessResponse | ErrorResponse> {
    try {
      const participant = await this.getParticipantByIdQuery.execute(participantId) as Participant;
      const smallestPair = await this.getPairWithFewestMembersQuery.execute() as Pair | null;
      if (smallestPair == null) {
        // TODO: 管理者にメール
        throw Error('参加可能なペアがありません');
      }
      const pairs = await this.enrollParticipantService.execute(smallestPair, participant) as Pair[];
      await this.savePairCommand.execute(pairs);
      return new SuccessResponse('参加者のステータス更新に成功失敗しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者のステータス更新に失敗しました');
    }
  }
}
