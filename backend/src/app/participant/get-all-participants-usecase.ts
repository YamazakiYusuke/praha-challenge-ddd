import { Injectable, Inject } from "@nestjs/common";
import { IGetAllParticipantsQuery } from "src/domain/commands/participant/get-all-participants-query";
import { Participant } from "src/domain/entities/participant";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";
import { ParticipantDTO } from "./dto/participant-dto";

@Injectable()
export class GetAllParticipantsUsecase {
  constructor(
    @Inject('IGetAllParticipantsQuery')
    private readonly getAllParticipantsQuery: IGetAllParticipantsQuery,
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
