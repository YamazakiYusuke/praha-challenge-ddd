import { Inject, Injectable } from "@nestjs/common";
import { IGetParticipantsWithAssignmentsPagedQuery, ParticipantPaginationProps } from "src/domain/commands/participant/get-participants-paged-query";
import { Participant } from "src/domain/entities/participant";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";

@Injectable()
export class GetParticipantsPagedUsecase {
  constructor(
    @Inject('IGetParticipantsWithAssignmentsPagedQuery')
    private readonly getParticipantsWithAssignmentsPagedQuery: IGetParticipantsWithAssignmentsPagedQuery,
  ) { }

  public async execute(props: ParticipantPaginationProps): Promise<Participant[] | ErrorResponse> {
    try {
      return await this.getParticipantsWithAssignmentsPagedQuery.execute(props);
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者の取得に失敗しました');
    }
  }
}
