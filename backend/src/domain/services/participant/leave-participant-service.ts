import { GetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Participant } from "src/domain/entities/participant";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { ReallocateLastParticipantInPairService } from "src/domain/services/pair/reallocate-last-participant-in-pair-service";
import { ValidateTeamMemberService } from "src/domain/services/team/validate-team-member-service";
import { PairId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";

@injectable()
export class LeaveParticipantService {
  constructor(
    @inject(GetPairByIdQuery)
    private readonly getPairByIdQuery: GetPairByIdQuery,
    @inject(SavePairCommand)
    private readonly saveParticipantCommand: SaveParticipantCommand,
    @inject(ValidateTeamMemberService)
    private readonly validateTeamMemberService: ValidateTeamMemberService,
    @inject(ReallocateLastParticipantInPairService)
    private readonly reallocateLastParticipantInPairService: ReallocateLastParticipantInPairService,
  ) { }

  async execute(participant: Participant): Promise<void> {
    const pair = await this.getPairByIdQuery.execute(participant.pairId as PairId);
    if (pair == null) {
      throw new DomainServiceError('ペアが存在しません');
    }
    participant.changeEnrollmentStatusToOnLeave();
    pair.removeParticipant(participant.id);
    await this.saveParticipantCommand.execute(participant);

    await this.validateTeamMemberService.execute(pair.teamId, participant);
    await this.reallocateLastParticipantInPairService.execute(pair, participant);
  }
}
