import { GetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { GetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Transaction } from "src/domain/commands/transaction/transaction";
import { Pair } from "src/domain/entities/pair";
import { Participant, ParticipantProps } from "src/domain/entities/participant";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { EntityError } from "src/domain/errors/entity_error";
import { CreateAdminEmailService } from "src/domain/services/admin_email/create-admin-email-service";
import { SendAdminEmailService } from "src/domain/services/admin_email/send-admin-email-service";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { EnrollmentStatusValue } from "src/domain/util/enums";
import { Email } from "src/domain/values/email";
import { PairId, ParticipantId, TeamId } from "src/domain/values/ids";
import { PairName, PersonName } from "src/domain/values/name";
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# EnrollParticipantService UnitTest\n', () => {
  let getPairWithFewestMembersQuery: GetPairWithFewestMembersQuery;
  let createPairService: CreatePairService;
  let savePairCommand: SavePairCommand;
  let saveParticipantCommand: SaveParticipantCommand;
  let transaction: Transaction;
  let createAdminEmailService: CreateAdminEmailService;
  let sendAdminEmailService: SendAdminEmailService;
  let getParticipantByIdQuery: GetParticipantByIdQuery;
  let enrollParticipantService: EnrollParticipantService;

  const teamId = TeamId.restore('teamId');
  function pairId(index: number) {
    return PairId.restore(`pairId${index}`);
  }
  function participantId(index: number) {
    return ParticipantId.restore(`participantId${index}`);
  }
  const participantProps: ParticipantProps = {
    name: PersonName.restore('Participant Name'),
    email: Email.create('participant@example.com'),
    teamId: TeamId.create(),
    pairId: PairId.create(),
    enrollmentStatus: EnrollmentStatusValue.OnLeave,
  };
  function participant(participantId: ParticipantId): Participant {
    return Participant.restore(participantId, participantProps);
  }

  beforeEach(() => {
    getPairWithFewestMembersQuery = mock(GetPairWithFewestMembersQuery);
    createPairService = mock(CreatePairService);
    savePairCommand = mock(SavePairCommand);
    saveParticipantCommand = mock(SaveParticipantCommand);
    transaction = mock(Transaction);
    createAdminEmailService = mock(CreateAdminEmailService);
    sendAdminEmailService = mock(SendAdminEmailService);
    getParticipantByIdQuery = mock(GetParticipantByIdQuery);
    enrollParticipantService = new EnrollParticipantService(
      instance(getPairWithFewestMembersQuery),
      instance(createPairService),
      instance(savePairCommand),
      instance(saveParticipantCommand),
      instance(transaction),
      instance(createAdminEmailService),
      instance(sendAdminEmailService),
      instance(getParticipantByIdQuery),
    );
  });

  describe('## execute\n', () => {
    test('- when there is no pair with fewest members\n', async () => {
      // 準備
      when(getPairWithFewestMembersQuery.execute()).thenResolve(null);
      const newParticipant = participant(participantId(1));
      // 実行
      await expect(enrollParticipantService.execute(newParticipant)).rejects.toThrow(DomainServiceError);
      // 確認
      verify(getPairWithFewestMembersQuery.execute()).once();
      verify(createPairService.execute(anything())).never();
      verify(savePairCommand.execute(anything(), anything())).never();
      verify(saveParticipantCommand.execute(anything(), anything())).never();
      verify(transaction.execute(anything())).never();
      verify(createAdminEmailService.execute(anything())).once();
      verify(sendAdminEmailService.execute(anything())).once();
      verify(getParticipantByIdQuery.execute(anything())).never();
    });

    describe('- when there is a pair with fewest members\n', () => {
      test('- smallestPair.participantsLength == 3\n', async () => {
        // 準備
        const newParticipant = participant(participantId(1));
        const smallestPair = Pair.restore(pairId(1), { teamId: teamId, name: PairName.restore('smallestPairName'), participantIds: [participantId(2), participantId(3), participantId(4)] });
        const newPair = Pair.restore(pairId(2), { teamId: teamId, name: PairName.restore('newPairName'), participantIds: [participantId(4), participantId(1)] });
        when(transaction.execute(anything())).thenCall(async (callback: (transaction: any) => Promise<void>) => {
          await callback('');
        });
        when(getPairWithFewestMembersQuery.execute()).thenResolve(smallestPair);
        when(getParticipantByIdQuery.execute(anything())).thenResolve(participant(participantId(4)))
        when(createPairService.execute(anything())).thenResolve(newPair);
        // 実行
        await enrollParticipantService.execute(newParticipant);
        // 確認
        verify(getPairWithFewestMembersQuery.execute()).once();
        verify(createPairService.execute(anything())).once();
        verify(savePairCommand.execute(anything(), anything())).twice();
        verify(saveParticipantCommand.execute(anything(), anything())).twice();
        verify(transaction.execute(anything())).once();
        verify(createAdminEmailService.execute(anything())).never();
        verify(sendAdminEmailService.execute(anything())).never();
        verify(getParticipantByIdQuery.execute(anything())).once();
      });

      test('- smallestPair.participantsLength != 3\n', async () => {
        // 準備
        const newParticipant = participant(participantId(1));
        const smallestPair = Pair.restore(pairId(1), { teamId: teamId, name: PairName.restore('smallestPairName'), participantIds: [participantId(2), participantId(3)] });
        when(transaction.execute(anything())).thenCall(async (callback: (transaction: any) => Promise<void>) => {
          await callback('');
        });
        when(getPairWithFewestMembersQuery.execute()).thenResolve(smallestPair);
        // 実行
        await enrollParticipantService.execute(newParticipant);
        // 確認
        verify(getPairWithFewestMembersQuery.execute()).once();
        verify(createPairService.execute(anything())).never();
        verify(savePairCommand.execute(anything(), anything())).once();
        verify(saveParticipantCommand.execute(anything(), anything())).once();
        verify(transaction.execute(anything())).once();
        verify(createAdminEmailService.execute(anything())).never();
        verify(sendAdminEmailService.execute(anything())).never();
        verify(getParticipantByIdQuery.execute(anything())).never();
      });
    });
  });
});
