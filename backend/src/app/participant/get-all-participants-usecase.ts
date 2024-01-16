import { Injectable } from "@nestjs/common";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";
import { ParticipantDTO } from "./dto/participant-dto";
import { GetAllParticipantsQuery } from "src/domain/commands/participant/get-all-participants-query";
import { Participant } from "src/domain/entities/participant";

@Injectable()
export class GetAllParticipantsUsecase {
  constructor(
    private readonly getAllParticipantsQuery: GetAllParticipantsQuery,
  ) { }

  public async execute(): Promise<ParticipantDTO[] | ErrorResponse> {
    try {
      const participants = await this.getAllParticipantsQuery.execute() as Participant[];
      const participantDTOs = participants.map(e => new ParticipantDTO(e));
      return participantDTOs;
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者の取得に失敗しました');
    }
  }
}
