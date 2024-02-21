import { Inject, Injectable } from "@nestjs/common";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { IGetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { IGetPairWithFewestMembersByTeamIdQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-by-team-id-query";
import { ISavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { IGetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { Participant } from "src/domain/entities/participant";
import { IEnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { IParticipantToWithDrownService } from "src/domain/services/participant/participant-to-with-drown-service";
import { ParticipantId } from "src/domain/values/id";
import { debuglog } from "util";

@Injectable()
export class ParticipantToWithDrownUseCase {
  constructor(
    @Inject('IGetParticipantByIdQuery')
    private readonly getParticipantByIdQuery: IGetParticipantByIdQuery,
    @Inject('IParticipantToWithDrownService')
    private readonly participantToWithDrownService: IParticipantToWithDrownService,
  ) { }

  async execute(participantId: ParticipantId): Promise<SuccessResponse | ErrorResponse> {
    try {
      const participant = await this.getParticipantByIdQuery.execute(participantId) as Participant;
      await this.participantToWithDrownService.execute(participant);
      return new SuccessResponse('参加者のステータス更新に成功失敗しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者のステータス更新に失敗しました');
    }
  }
}
