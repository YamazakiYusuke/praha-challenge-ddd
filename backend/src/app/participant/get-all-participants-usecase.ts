import { GetAllParticipantsQuery } from "src/domain/commands/participant/get-all-participants-query";
import { Participant } from "src/domain/entities/participant";
import { container } from "tsyringe";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";

export class GetAllParticipantsUsecase {
  constructor(
    private readonly getAllParticipantsQuery: GetAllParticipantsQuery = container.resolve(GetAllParticipantsQuery),
  ) { }

  public async execute(): Promise<Participant[] | ErrorResponse> {
    try {
      return await this.getAllParticipantsQuery.execute();
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者の取得に失敗しました');
    }
  }
}
