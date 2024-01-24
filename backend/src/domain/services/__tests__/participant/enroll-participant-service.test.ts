import { Pair } from "src/domain/entities/pair";
import { Participant } from "src/domain/entities/participant";
import { Participants } from "src/domain/entities/participants";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { Email } from "src/domain/values/email";
import { PairId, ParticipantId, ParticipantsId, TeamId } from "src/domain/values/id";
import { PairName, PersonName } from "src/domain/values/name";
import { EnrollmentStatusValue } from "src/util/enums";
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# EnrollParticipantService UnitTest\n', () => {
  let createPairService: CreatePairService;
  let enrollParticipantService: EnrollParticipantService;
  const teamId = () => TeamId.restore('teamId');
  const pairId = () => PairId.restore('pairId');
  const participant1 = () => Participant.restore(ParticipantId.restore('participantId1'), {
    name: PersonName.restore('PersonName1'),
    email: Email.restore('sample1@example.com'),
    teamId: teamId(),
    pairId: pairId(),
    enrollmentStatus: EnrollmentStatusValue.Enrolled
  });
  const participant2 = () => Participant.restore(ParticipantId.restore('participantId2'), {
    name: PersonName.restore('PersonName2'),
    email: Email.restore('sample2@example.com'),
    teamId: teamId(),
    pairId: pairId(),
    enrollmentStatus: EnrollmentStatusValue.Enrolled
  });
  const participant3 = () => Participant.restore(ParticipantId.restore('participantId3'), {
    name: PersonName.restore('PersonName3'),
    email: Email.restore('sample3@example.com'),
    teamId: teamId(),
    pairId: pairId(),
    enrollmentStatus: EnrollmentStatusValue.Enrolled
  });
  const participantsId = () => ParticipantsId.restore('participantId');
  const getPair = (participants: Participant[]) => Pair.restore(pairId(), {
    teamId: teamId(),
    name: PairName.restore('z'),
    participants: Participants.restore(participantsId(), participants)
  });
  const newParticipant = (teamId: TeamId | undefined = undefined, pairId: PairId | undefined = undefined) => Participant.restore(ParticipantId.restore('newParticipantId'), {
    name: PersonName.restore('newParticipant'),
    email: Email.restore('new.participant@example.com'),
    teamId: teamId,
    pairId: pairId,
    enrollmentStatus: EnrollmentStatusValue.Enrolled
  });

  beforeEach(() => {
    createPairService = mock(CreatePairService);
    enrollParticipantService = new EnrollParticipantService(instance(createPairService));
  });

  describe('## execute\n', () => {
    test('- smallestPair has less than three members \n', async () => {
      // 準備
      let pair = getPair([participant1()]);
      when(createPairService.execute(anything())).thenResolve(pair);
      // 実行
      const result = await enrollParticipantService.execute(pair, newParticipant()) as Pair[];
      // 確認
      verify(createPairService.execute(anything())).never();
      expect(result[0]?.participants.length).toEqual(2);
      expect(result).toEqual(expect.arrayContaining([getPair([participant1(), newParticipant(teamId(), pairId())])]));
    });

    // TODO: テストが失敗する
    test('- smallestPair has more than three members\n', async () => {
      // 準備
      let pair = getPair([participant1(), participant2(), participant3()]);
      when(createPairService.execute(anything())).thenResolve(pair);
      // 実行
      const result = await enrollParticipantService.execute(pair, newParticipant()) as Pair[];
      // 確認
      verify(createPairService.execute(anything())).once();
      expect(result[0]?.participants.length).toEqual(2);
      expect(result[1]?.participants.length).toEqual(2);
      expect(result[0]).toEqual(getPair([participant1(), participant2()]));
      // テストが失敗する
      // expect(result[1]).toEqual(getPair([participant3(), newParticipant(teamId(), pairId())]));
    });
  });
});
