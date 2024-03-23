import { Inject, Injectable } from "@nestjs/common";
import { IGetAllParticipantsQuery } from "src/domain/commands/participant/get-all-participants-query";
import { Participant } from "src/domain/entities/participant";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";

@Injectable()
export class GetAllParticipantsUsecase {
  constructor(
    @Inject('IGetAllParticipantsQuery')
    private readonly getAllParticipantsQuery: IGetAllParticipantsQuery,
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
