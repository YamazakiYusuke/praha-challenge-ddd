import { GetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Participant } from "src/domain/entities/participant";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { ReallocateLastParticipantInPairService } from "src/domain/services/pair/reallocate-last-participant-in-pair-service";
import { ValidateTeamMemberService } from "src/domain/services/team/validate-team-member-service";
import { PairId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";

@injectable()
export class WithdrawnParticipantService {
  constructor(
    @inject(GetPairByIdQuery)
    private readonly getPairByIdQuery: GetPairByIdQuery,
    @inject(SaveParticipantCommand)
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
    participant.changeEnrollmentStatusToWithDrawn();
    pair.removeParticipant(participant.id);

    await this.saveParticipantCommand.execute(participant);

    await this.validateTeamMemberService.execute(pair.teamId, participant);
    await this.reallocateLastParticipantInPairService.execute(pair, participant);
  }
}
