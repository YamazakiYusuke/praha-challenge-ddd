import { GetPairWithFewestMembersByTeamIdQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-by-team-id-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { GetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { SaveParticipantCommand } from "src/domain/commands/participant/save-participant-command";
import { Transaction } from "src/domain/commands/transaction/transaction";
import { AdminEmail } from "src/domain/entities/admin-email";
import { Pair, PairProps } from "src/domain/entities/pair";
import { Participant, ParticipantProps } from "src/domain/entities/participant";
import { ServiceError } from "src/domain/errors/service_error";
import { CreateAdminEmailService } from "src/domain/services/admin_email/create-admin-email-service";
import { SendAdminEmailService } from "src/domain/services/admin_email/send-admin-email-service";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { ReallocateLastParticipantInPairService } from "src/domain/services/pair/reallocate-last-participant-in-pair-service";
import { AdminEmailContent } from "src/domain/values/admin-email-content";
import { Email } from "src/domain/values/email";
import { AdminEmailId, PairId, ParticipantId, TeamId } from "src/domain/values/id";
import { PairName, PersonName } from "src/domain/values/name";
import { EmailStatus, EnrollmentStatusValue } from "src/util/enums";
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { container } from "tsyringe";

describe('# ReallocateLastParticipantInPairService UnitTest\n', () => {
  let getParticipantByIdQuery: GetParticipantByIdQuery;
  let createPairService: CreatePairService;
  let getPairWithFewestMembersByTeamIdQuery: GetPairWithFewestMembersByTeamIdQuery;
  let savePairCommand: SavePairCommand;
  let saveParticipantCommand: SaveParticipantCommand;
  let transaction: Transaction;
  let createAdminEmailService: CreateAdminEmailService;
  let sendAdminEmailService: SendAdminEmailService;
  let reallocateLastParticipantInPairService: ReallocateLastParticipantInPairService;
  const teamId = TeamId.restore('teamId');
  const pairId = PairId.restore('pairId');
  function participantId(index: number) {
    return ParticipantId.restore(`participantId${index}`);
  }
  const leavingParticipantProps: ParticipantProps = {
    name: PersonName.restore('Leaving Participant'),
    email: Email.create('leaving@example.com'),
    teamId: TeamId.create(),
    pairId: PairId.create(),
    enrollmentStatus: EnrollmentStatusValue.Enrolled,
  };
  function leavingParticipant(participantId: ParticipantId): Participant {
    return Participant.restore(participantId, leavingParticipantProps);
  }
  const lastParticipantProps: ParticipantProps = {
    name: PersonName.restore('Last Participant'),
    email: Email.create('last@example.com'),
    teamId: TeamId.create(),
    pairId: PairId.create(),
    enrollmentStatus: EnrollmentStatusValue.Enrolled,
  };
  function lastParticipant(participantId: ParticipantId): Participant {
    return Participant.restore(participantId, lastParticipantProps);
  }
  const otherPairsParticipantProps: ParticipantProps = {
    name: PersonName.restore('Other pair`s Participant'),
    email: Email.create('other@example.com'),
    teamId: TeamId.create(),
    pairId: PairId.create(),
    enrollmentStatus: EnrollmentStatusValue.Enrolled,
  };
  function otherPairsParticipant(participantId: ParticipantId): Participant {
    return Participant.restore(participantId, lastParticipantProps);
  }
  function pairProps(participantIds: ParticipantId[]): PairProps {
    return {
      teamId: teamId,
      name: PairName.create('Pair Name'),
      participantIds: participantIds,
    };
  }
  function pair(participantIds: ParticipantId[]) {
    return Pair.restore(pairId, pairProps(participantIds));
  }

  beforeEach(() => {
    // // 依存関係のモックを作成
    transaction = {
      execute: jest.fn().mockImplementation(async (callback) => {
        // コールバック関数を実行して、内部のモックメソッドが呼び出されるようにする
        await callback({}); // 空のトランザクションオブジェクトを渡す
      })
    } as unknown as Transaction;
    // const mockSaveParticipantCommand = { execute: jest.fn() } as unknown as SaveParticipantCommand;
    // const mockSavePairCommand = { execute: jest.fn() } as unknown as SavePairCommand;
    getParticipantByIdQuery = mock(GetParticipantByIdQuery);;
    createPairService = mock(CreatePairService);
    getPairWithFewestMembersByTeamIdQuery = mock(GetPairWithFewestMembersByTeamIdQuery);
    savePairCommand = mock(SavePairCommand);
    saveParticipantCommand = mock(SaveParticipantCommand);
    createAdminEmailService = mock(CreateAdminEmailService);
    sendAdminEmailService = mock(SendAdminEmailService);
    reallocateLastParticipantInPairService = new ReallocateLastParticipantInPairService(
      instance(getParticipantByIdQuery),
      instance(createPairService),
      instance(getPairWithFewestMembersByTeamIdQuery),
      instance(savePairCommand),
      instance(saveParticipantCommand),
      transaction,
      instance(createAdminEmailService),
      instance(sendAdminEmailService),
    );
  });

  describe('## execute\n', () => {
    describe('### pair.participantsLength is not 1 \n', () => {
      test('pair.participantsLength is 2', async () => {
        // 準備
        const participantId1 = participantId(1);
        const participantId2 = participantId(2);
        const participantId3 = participantId(3);
        // 実行
        await reallocateLastParticipantInPairService.execute(pair([participantId1, participantId2]), leavingParticipant(participantId3));
        // 確認
        verify(getParticipantByIdQuery.execute(anything())).never();
        verify(createPairService.execute(anything())).never();
        verify(getPairWithFewestMembersByTeamIdQuery.execute(anything(), anything())).never();
        verify(savePairCommand.execute(anything())).never();
        verify(saveParticipantCommand.execute(anything(), anything())).never();
        verify(transaction.execute(anything())).never();
        verify(createAdminEmailService.execute(anything())).never();
        verify(sendAdminEmailService.execute(anything())).never();
      });

      test('pair.participantsLength is 0', async () => {
        // 準備
        const leavingParticipantId = participantId(1);
        // 実行
        await reallocateLastParticipantInPairService.execute(pair([]), leavingParticipant(leavingParticipantId));
        // 確認
        verify(getParticipantByIdQuery.execute(anything())).never();
        verify(createPairService.execute(anything())).never();
        verify(getPairWithFewestMembersByTeamIdQuery.execute(anything(), anything())).never();
        verify(savePairCommand.execute(anything())).never();
        verify(saveParticipantCommand.execute(anything(), anything())).never();
        verify(transaction.execute(anything())).never();
        verify(createAdminEmailService.execute(anything())).never();
        verify(sendAdminEmailService.execute(anything())).never();
      });
    });

    describe('### pair.participantsLength is 1 \n', () => {
      test('fewestPair does not have valid number of participants', async () => {
        // 準備
        const lastParticipantId = participantId(1);
        const leavingParticipantId = participantId(2);
        const otherPairsParticipantId = participantId(3);
        const adminMail = AdminEmail.restore(AdminEmailId.create(), { content: AdminEmailContent.restore({ title: 'Test Title', body: 'Test Body' }), recipients: [], status: EmailStatus.Pending });
        when(getPairWithFewestMembersByTeamIdQuery.execute(anything(), anything())).thenResolve(pair([otherPairsParticipantId]));
        when(getParticipantByIdQuery.execute(anything())).thenResolve(lastParticipant(lastParticipantId))
        when(createAdminEmailService.execute(anything())).thenResolve(adminMail);
        when(sendAdminEmailService.execute(anything())).thenResolve();
        // 実行・確認
        await expect(reallocateLastParticipantInPairService.execute(pair([lastParticipantId]), leavingParticipant(leavingParticipantId))).rejects.toThrow(ServiceError);
        verify(getParticipantByIdQuery.execute(anything())).once();
        verify(createPairService.execute(anything())).never();
        verify(getPairWithFewestMembersByTeamIdQuery.execute(anything(), anything())).once();
        verify(savePairCommand.execute(anything())).never();
        verify(saveParticipantCommand.execute(anything(), anything())).never();
        verify(transaction.execute(anything())).never();
        verify(createAdminEmailService.execute(anything())).once();
        verify(sendAdminEmailService.execute(anything())).once();
      });

      test('fewestPair has pair`s max number participants', async () => {
        // 準備
        const lastParticipantId = participantId(1);
        const leavingParticipantId = participantId(2);
        const otherPairsParticipantId1 = participantId(3);
        const otherPairsParticipantId2 = participantId(4);
        const otherPairsParticipantId3 = participantId(5);
        when(getPairWithFewestMembersByTeamIdQuery.execute(anything(), anything())).thenResolve(pair([otherPairsParticipantId1, otherPairsParticipantId2, otherPairsParticipantId3,]));
        when(getParticipantByIdQuery.execute(lastParticipantId)).thenResolve(lastParticipant(lastParticipantId))
        when(getParticipantByIdQuery.execute(otherPairsParticipantId3)).thenResolve(otherPairsParticipant(otherPairsParticipantId3))
        when(createPairService.execute(anything())).thenResolve(pair([lastParticipantId, otherPairsParticipantId3]));
        when(transaction.execute(anything())).thenResolve();
        when(savePairCommand.execute(anything())).thenResolve();
        // 実行・確認
        await reallocateLastParticipantInPairService.execute(pair([lastParticipantId]), leavingParticipant(leavingParticipantId));
        verify(getParticipantByIdQuery.execute(anything())).times(2);
        verify(createPairService.execute(anything())).once();
        verify(getPairWithFewestMembersByTeamIdQuery.execute(anything(), anything())).once();
        verify(savePairCommand.execute(anything())).never(); // 
        verify(saveParticipantCommand.execute(anything(), anything())).never();// 
        verify(transaction.execute(anything())).once();
        verify(createAdminEmailService.execute(anything())).never();
        verify(sendAdminEmailService.execute(anything())).never();
      });
    });
  });
});
