import { Inject, Injectable } from "@nestjs/common";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { IGetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { ISavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { ParticipantProps } from "src/domain/entities/participant";
import { debuglog } from "util";

@Injectable()
export class AddNewParticipantUsecase {
  constructor(
    @Inject('IGetPairWithFewestMembersQuery')
    private readonly getPairWithFewestMembersQuery: IGetPairWithFewestMembersQuery,
    @Inject('ISavePairCommand')
    private readonly savePairCommand: ISavePairCommand,
  ) { }

  async execute(props: ParticipantProps): Promise<SuccessResponse | ErrorResponse> {
    try {
      // TODO: 処理の実装
      return new SuccessResponse('新規参加者の追加に成功しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('新規参加者の追加に失敗しました');
    }
  }
}

