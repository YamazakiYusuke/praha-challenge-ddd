import { GetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Transaction } from "src/domain/commands/transaction/transaction";
import { Pair } from "src/domain/entities/pair";
import { Participant, ParticipantProps } from "src/domain/entities/participant";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { ReallocateLastParticipantInPairService } from "src/domain/services/pair/reallocate-last-participant-in-pair-service";
import { LeaveParticipantService } from "src/domain/services/participant/leave-participant-service";
import { ValidateTeamMemberService } from "src/domain/services/team/validate-team-member-service";
import { EnrollmentStatusValue } from "src/domain/util/enums";
import { Email } from "src/domain/values/email";
import { PairId, ParticipantId, TeamId } from "src/domain/values/ids";
import { PairName, PersonName } from "src/domain/values/name";
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# LeaveParticipantService UnitTest\n', () => {
  let getPairByIdQuery: GetPairByIdQuery;
  let savePairCommand: SavePairCommand;
  let saveParticipantCommand: SaveParticipantCommand;
  let transaction: Transaction;
  let validateTeamMemberService: ValidateTeamMemberService;
  let reallocateLastParticipantInPairService: ReallocateLastParticipantInPairService;
  let leaveParticipantService: LeaveParticipantService;

  const teamId = TeamId.restore('teamId');
  function pairId(index: number) {
    return PairId.restore(`pairId${index}`);
  }
  function participantId(index: number) {
    return ParticipantId.restore(`participantId${index}`);
  }
  const participantProps: ParticipantProps = {
    name: PersonName.restore('Participant Name'),
    email: Email.restore('participant@example.com'),
    teamId: teamId,
    pairId: pairId(1),
    enrollmentStatus: EnrollmentStatusValue.Enrolled,
  };
  function participant(participantId: ParticipantId): Participant {
    return Participant.restore(participantId, participantProps);
  }

  beforeEach(() => {
    getPairByIdQuery = mock(GetPairByIdQuery);
    savePairCommand = mock(SavePairCommand);
    saveParticipantCommand = mock(SaveParticipantCommand);
    transaction = mock(Transaction);
    validateTeamMemberService = mock(ValidateTeamMemberService);
    reallocateLastParticipantInPairService = mock(ReallocateLastParticipantInPairService);
    leaveParticipantService = new LeaveParticipantService(
      instance(getPairByIdQuery),
      instance(savePairCommand),
      instance(saveParticipantCommand),
      instance(validateTeamMemberService),
      instance(reallocateLastParticipantInPairService),
      instance(transaction),
    );
  });

  describe('## execute\n', () => {
    test('- when pair does not exist\n', async () => {
      // 準備
      when(getPairByIdQuery.execute(anything())).thenResolve(null);
      const leavingParticipant = participant(participantId(1));
      // 実行
      await expect(leaveParticipantService.execute(leavingParticipant)).rejects.toThrow(DomainServiceError);
      // 確認
      verify(getPairByIdQuery.execute(anything())).once();
      verify(saveParticipantCommand.execute(anything(), anything())).never();
      verify(savePairCommand.execute(anything(), anything())).never();
      verify(transaction.execute(anything())).never();
      verify(validateTeamMemberService.execute(anything(), anything())).never();
      verify(reallocateLastParticipantInPairService.execute(anything(), anything())).never();
    });

    test('- when pair exists\n', async () => {
      // 準備
      const leavingParticipant = participant(participantId(1));
      const existingPair = Pair.restore(pairId(1), { teamId: teamId, name: PairName.restore('Existing Pair'), participantIds: [participantId(1), participantId(2)] });
      when(getPairByIdQuery.execute(anything())).thenResolve(existingPair);
      when(transaction.execute(anything())).thenCall(async (callback: (transaction: any) => Promise<void>) => {
        await callback('');
      });
      // 実行
      await leaveParticipantService.execute(leavingParticipant);
      // 確認
      verify(getPairByIdQuery.execute(anything())).once();
      verify(saveParticipantCommand.execute(leavingParticipant, anything())).once();
      verify(savePairCommand.execute(existingPair, anything())).once();
      verify(transaction.execute(anything())).once();
      verify(validateTeamMemberService.execute(existingPair.teamId, leavingParticipant)).once();
      verify(reallocateLastParticipantInPairService.execute(existingPair, leavingParticipant)).once();
    });
  });
});
