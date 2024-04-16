import { GetParticipantsWithAssignmentsPagedQuery, ParticipantPaginationProps } from 'src/domain/commands/participant/get-participants-paged-query';
import { AssignmentProgress } from 'src/domain/entities/assignment-progress';
import { Participant } from 'src/domain/entities/participant';
import { IParticipantRepository, ParticipantWithAssignments } from 'src/domain/repositories/participant-repository';
import { AssignmentProgressStateValue, EnrollmentStatusValue } from 'src/domain/util/enums';
import { Email } from 'src/domain/values/email';
import { AssignmentId, ParticipantId } from 'src/domain/values/ids';
import { PersonName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetParticipantsWithAssignmentsPagedQuery UnitTest \n', () => {
  let query: GetParticipantsWithAssignmentsPagedQuery;
  let participantRepository: IParticipantRepository;

  beforeEach(() => {
    participantRepository = mock<IParticipantRepository>();
    when(participantRepository.getAllWithAssignments()).thenResolve(participantWithAssignments);
    query = new GetParticipantsWithAssignmentsPagedQuery(instance(participantRepository));
  });
  function participantId(index: number): ParticipantId {
    return ParticipantId.restore(index.toString());
  }
  const assignmentId1 = AssignmentId.restore('1');
  const assignmentId2 = AssignmentId.restore('2');
  const participantWithAssignmentLength = 14;
  const participantWithAssignments: ParticipantWithAssignments[] = Array.from({ length: participantWithAssignmentLength }, (_, i) => {
    let assignmentProgress1: AssignmentProgress;
    let assignmentProgress2: AssignmentProgress;
    const participant = Participant.restore(participantId(i), {
      name: PersonName.create(`Participant ${i}`),
      email: Email.create(`participant${i}@example.com`),
      enrollmentStatus: EnrollmentStatusValue.Enrolled,
      teamId: undefined,
      pairId: undefined,
    });
    if (i % 2 == 0) {
      assignmentProgress1 = AssignmentProgress.create({
        assignmentId: assignmentId1,
        participantId: participant.id,
        assignmentProgressState: AssignmentProgressStateValue.NotStarted
      });
      assignmentProgress2 = AssignmentProgress.create({
        assignmentId: assignmentId2,
        participantId: participant.id,
        assignmentProgressState: AssignmentProgressStateValue.NotStarted
      });
    } else {
      assignmentProgress1 = AssignmentProgress.create({
        assignmentId: assignmentId1,
        participantId: participant.id,
        assignmentProgressState: AssignmentProgressStateValue.Completed
      });
      assignmentProgress2 = AssignmentProgress.create({
        assignmentId: assignmentId2,
        participantId: participant.id,
        assignmentProgressState: AssignmentProgressStateValue.Completed
      });
    }

    return new ParticipantWithAssignments(participant, [assignmentProgress1, assignmentProgress2]);
  });

  describe('## 絞り込みなし \n', () => {
    it('- 1ページ目 \n', async () => {
      // 準備
      const props: ParticipantPaginationProps = {
        page: 1,
        size: 10,
        assignmentStates: []
      };
      // 実行
      const result = await query.execute(props);
      // 確認
      verify(participantRepository.getAllWithAssignments()).once();
      expect(result.length).toEqual(10);
      for (let i = 0; i < 10; i++) {
        expect(result[i]!.id).toEqual(participantId(i));
      }
    });

    it('- 2ページ目 \n', async () => {
      // 準備
      const props: ParticipantPaginationProps = {
        page: 2,
        size: 10,
        assignmentStates: []
      };
      // 実行
      const result = await query.execute(props);
      // 確認
      verify(participantRepository.getAllWithAssignments()).once();
      expect(result.length).toEqual(4);
      for (let i = 1; i < 4; i++) {
        expect(result[i]!.id).toEqual(participantId(i + 10));
      }
    });
  });

  describe('## 絞り込みあり \n', () => {
    it('- assignmentId1のAssignmentProgressStateValue.NotStartedで絞る \n', async () => {
      // 準備
      const props: ParticipantPaginationProps = {
        page: 1,
        size: 10,
        assignmentStates: [
          {
            assignmentId: assignmentId1,
            assignmentProgressState: AssignmentProgressStateValue.NotStarted
          }
        ]
      };
      // 実行
      const result = await query.execute(props);
      // 確認
      verify(participantRepository.getAllWithAssignments()).once();
      expect(result.length).toEqual(7);
      for (let i = 0; i < 7; i++) {
        expect(result[i]!.id).toEqual(participantId(i * 2));
      }
    });
    it('- assignmentId1のAssignmentProgressStateValue.NotStarted || assignmentId2のAssignmentProgressStateValue.Completedで絞る \n', async () => {
      // 準備
      const props: ParticipantPaginationProps = {
        page: 1,
        size: 10,
        assignmentStates: [
          {
            assignmentId: assignmentId1,
            assignmentProgressState: AssignmentProgressStateValue.NotStarted
          },
          {
            assignmentId: assignmentId2,
            assignmentProgressState: AssignmentProgressStateValue.Completed
          }
        ]
      };
      // 実行
      const result = await query.execute(props);
      // 確認
      verify(participantRepository.getAllWithAssignments()).once();
      expect(result.length).toEqual(0);
    });
  });
});