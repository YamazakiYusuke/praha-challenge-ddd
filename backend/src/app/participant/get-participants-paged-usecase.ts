import { GetParticipantsWithAssignmentsPagedQuery, ParticipantPaginationProps } from "src/domain/commands/participant/get-participants-paged-query";
import { Participant } from "src/domain/entities/participant";
import { container } from "tsyringe";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";

export class GetParticipantsPagedUsecase {
  constructor(
    private readonly getParticipantsWithAssignmentsPagedQuery: GetParticipantsWithAssignmentsPagedQuery = container.resolve(GetParticipantsWithAssignmentsPagedQuery),
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
