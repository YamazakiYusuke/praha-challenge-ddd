import { Injectable } from "@nestjs/common";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { GetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { Pair } from "src/domain/entities/pair";
import { Participant, ParticipantProps } from "src/domain/entities/participant";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { debuglog } from "util";

@Injectable()
export class AddNewParticipantUsecase {
  constructor(
    private readonly getPairWithFewestMembersQuery: GetPairWithFewestMembersQuery,
    private readonly enrollParticipantService: EnrollParticipantService,
    private readonly savePairCommand: SavePairCommand,
  ) { }

  async execute(props: ParticipantProps): Promise<SuccessResponse | ErrorResponse> {
    try {
      const participant = Participant.create(props) as Participant;
      const smallestPair = await this.getPairWithFewestMembersQuery.execute() as Pair | null;
      if (smallestPair == null) {
        throw Error('参加可能なペアがありません');
      }
      const pairs = await this.enrollParticipantService.execute(smallestPair, participant) as Pair[];
      await this.savePairCommand.execute(pairs);
      return new SuccessResponse('新規参加者の追加に成功しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('新規参加者の追加に失敗しました');
    }
  }
}

