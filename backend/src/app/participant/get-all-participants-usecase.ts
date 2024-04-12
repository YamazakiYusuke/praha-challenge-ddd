import { ParticipantDto } from "src/app/participant/dto/participant-dto";
import { GetAllParticipantsQuery } from "src/domain/commands/participant/get-all-participants-query";
import { inject, injectable } from "tsyringe";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";
import { isExpectedError } from "src/app/util/is-expected-error";

@injectable()
export class GetAllParticipantsUsecase {
  constructor(
    @inject(GetAllParticipantsQuery)
    private readonly getAllParticipantsQuery: GetAllParticipantsQuery,
  ) { }

  public async execute(): Promise<ParticipantDto[] | ErrorResponse> {
    try {
      const participants = await this.getAllParticipantsQuery.execute();
      return participants.map((participant) => new ParticipantDto(participant));
    } catch (e: any) {
      debuglog(`Exception: ${e}`);
      if (isExpectedError(e)) {
        return new ErrorResponse(400, `参加者の取得に失敗しました。${e.name}:${e.message}`);
      } else {
        return new ErrorResponse(500, '参加者の取得に失敗しました。');
      }
    }
  }
}
