import { AssignmentProgress, AssignmentProgressProps } from "src/domain/entities/assignment-progress";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository, ParticipantWithAssignments } from "src/domain/repositories/participant-repository";
import { AssignmentProgressState } from "src/domain/values/assignment-progress-state";
import { AssignmentId, AssignmentProgressId, ParticipantId } from "src/domain/values/id";
import { AssignmentProgressStateValue } from "src/util/enums";

export class InMemoryParticipantRepository implements IParticipantRepository {
  private participants: Participant[] = [];

  async save(participant: Participant): Promise<void> {
    this.participants.push(participant);
    return;
  }

  async getAll(): Promise<Participant[]> {
    return this.participants;
  }

  async getAllWithAssignments(): Promise<Error | ParticipantWithAssignments[]> {
    const id = AssignmentProgressId.restore('Id');
    const assignmentId = AssignmentId.restore('assignmentId');
    const participantId = ParticipantId.restore('participantId');
    const assignmentProgressState = AssignmentProgressState.restore(AssignmentProgressStateValue.NotStarted);
    const props: AssignmentProgressProps = { assignmentId, participantId, assignmentProgressState };
    const assignmentProgress = AssignmentProgress.restore(id, props);
    return this.participants.map((participant) =>
      new ParticipantWithAssignments(participant, [assignmentProgress]));
  }
}
