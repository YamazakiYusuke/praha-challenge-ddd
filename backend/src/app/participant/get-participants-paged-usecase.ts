import { Injectable } from "@nestjs/common";
import { GetParticipantsWithAssignmentsPagedQuery, ParticipantPaginationProps } from "src/domain/commands/participant/get-participants-paged-query";
import { Participant } from "src/domain/entities/participant";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";
import { ParticipantDTO } from "./dto/participant-dto";

@Injectable()
export class GetParticipantsPagedUsecase {
  constructor(
    private readonly getParticipantsWithAssignmentsPagedQuery: GetParticipantsWithAssignmentsPagedQuery,
  ) { }

  public async execute(props: ParticipantPaginationProps): Promise<ParticipantDTO[] | ErrorResponse> {
    try {
      const participants = await this.getParticipantsWithAssignmentsPagedQuery.execute(props) as Participant[];
      const participantDTOs = participants.map(e => new ParticipantDTO(e));
      return participantDTOs;
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者の取得に失敗しました');
    }
  }
}
