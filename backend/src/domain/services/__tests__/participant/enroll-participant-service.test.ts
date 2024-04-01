import { GetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Transaction } from "src/domain/commands/transaction/transaction";
import { Pair } from "src/domain/entities/pair";
import { Participant, ParticipantProps } from "src/domain/entities/participant";
import { EntityError } from "src/domain/errors/entity_error";
import { CreateAdminEmailService } from "src/domain/services/admin_email/create-admin-email-service";
import { SendAdminEmailService } from "src/domain/services/admin_email/send-admin-email-service";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { Email } from "src/domain/values/email";
import { PairId, ParticipantId, TeamId } from "src/domain/values/id";
import { PairName, PersonName } from "src/domain/values/name";
import { EnrollmentStatusValue } from "src/util/enums";
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# EnrollParticipantService UnitTest\n', () => {
  let getPairWithFewestMembersQuery: GetPairWithFewestMembersQuery;
  let savePairCommand: SavePairCommand;
  let saveParticipantCommand: SaveParticipantCommand;
  let transaction: Transaction;
  let createAdminEmailService: CreateAdminEmailService;
  let sendAdminEmailService: SendAdminEmailService;
  let enrollParticipantService: EnrollParticipantService;

  const teamId = TeamId.restore('teamId');
  const pairId = PairId.restore('pairId');
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
    savePairCommand = mock(SavePairCommand);
    saveParticipantCommand = mock(SaveParticipantCommand);
    transaction = mock(Transaction);
    createAdminEmailService = mock(CreateAdminEmailService);
    sendAdminEmailService = mock(SendAdminEmailService);
    enrollParticipantService = new EnrollParticipantService(
      instance(getPairWithFewestMembersQuery),
      instance(savePairCommand),
      instance(saveParticipantCommand),
      instance(transaction),
      instance(createAdminEmailService),
      instance(sendAdminEmailService),
    );
  });

  describe('## execute\n', () => {
    test('- when there is no pair with fewest members\n', async () => {
      // 準備
      when(getPairWithFewestMembersQuery.execute()).thenResolve(null);
      const newParticipant = participant(participantId(1));
      // 実行
      await expect(enrollParticipantService.execute(newParticipant)).rejects.toThrow(EntityError);
      // 確認
      verify(createAdminEmailService.execute(anything())).once();
      verify(sendAdminEmailService.execute(anything())).once();
      verify(saveParticipantCommand.execute(anything(), anything())).never();
      verify(savePairCommand.execute(anything(), anything())).never();
      verify(transaction.execute(anything())).never();
    });

    test('- when there is a pair with fewest members\n', async () => {
      // 準備
      const newParticipant = participant(participantId(1));
      const smallestPair = Pair.restore(pairId, { teamId: teamId, name: PairName.restore('pairName'), participantIds: [participantId(2), participantId(3)] });
      when(transaction.execute(anything())).thenCall(async (callback: (transaction: any) => Promise<void>) => {
        await callback('');
      });
      when(getPairWithFewestMembersQuery.execute()).thenResolve(smallestPair);
      // 実行
      await enrollParticipantService.execute(newParticipant);
      // 確認
      verify(saveParticipantCommand.execute(anything(), anything())).once();
      verify(savePairCommand.execute(smallestPair, anything())).once();
      verify(transaction.execute(anything())).once();
      verify(createAdminEmailService.execute(anything())).never();
      verify(sendAdminEmailService.execute(anything())).never();
    });
  });
});
