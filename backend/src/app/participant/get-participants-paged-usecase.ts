import { ParticipantDto } from "src/app/participant/dto/participant_dto";
import { GetParticipantsWithAssignmentsPagedQuery, ParticipantPaginationProps } from "src/domain/commands/participant/get-participants-paged-query";
import { inject, injectable } from "tsyringe";
import { debuglog } from "util";
import { ErrorResponse } from "../responses/error-response";

@injectable()
export class GetParticipantsPagedUsecase {
  constructor(
    @inject(GetParticipantsWithAssignmentsPagedQuery)
    private readonly getParticipantsWithAssignmentsPagedQuery: GetParticipantsWithAssignmentsPagedQuery,
  ) { }

  public async execute(props: ParticipantPaginationProps): Promise<ParticipantDto[] | ErrorResponse> {
    try {
      const participants = await this.getParticipantsWithAssignmentsPagedQuery.execute(props);
      return participants.map((participant) => new ParticipantDto(participant));
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者の取得に失敗しました');
    }
  }
}
