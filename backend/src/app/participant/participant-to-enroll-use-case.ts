import { Injectable } from "@nestjs/common";
import { ErrorResponse } from "src/app/responses/error-response";
import { SuccessResponse } from "src/app/responses/success-response";
import { GetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { GetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { Participants } from "src/domain/entities/participants";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { Id } from "src/domain/values/id";
import { debuglog } from "util";

@Injectable()
export class ParticipantToEnrollUseCase {
  constructor(
    private readonly getOneParticipantQuery: GetParticipantByIdQuery,
    private readonly getPairWithFewestMembersQuery: GetPairWithFewestMembersQuery,
    private readonly savePairCommand: SavePairCommand,
    private readonly createPairService: CreatePairService,
  ) { }

  async execute(participantId: string): Promise<SuccessResponse | ErrorResponse> {
    try {
      const participant = await this.getOneParticipantQuery.execute(Id.restore(participantId)) as Participant;
      const smallestPair = await this.getPairWithFewestMembersQuery.execute() as Pair;

      if (smallestPair.participantsLength < 3) {
        smallestPair.appendParticipant(participant);
        await this.savePairCommand.execute([smallestPair]);
      } else {
        const mover = smallestPair.lastParticipant;
        smallestPair.removeParticipant(mover);
        const newParticipants = Participants.create([mover, participant]) as Participants;
        const enrolledPair = await (this.createPairService.execute({ teamId: smallestPair.teamId, participants: newParticipants })) as Pair;
        await this.savePairCommand.execute([smallestPair, enrolledPair]);
      }
      return new SuccessResponse('参加者のステータス更新に成功失敗しました');
    } catch (e) {
      debuglog(`Exception: ${e}`);
      return new ErrorResponse('参加者のステータス更新に失敗しました');
    }

  }
}
