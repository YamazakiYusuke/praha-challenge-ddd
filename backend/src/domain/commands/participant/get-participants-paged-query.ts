import { IGetQuery } from "src/domain/commands/base/get-query";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository, ParticipantWithAssignments } from "src/domain/repositories/participant-repository";
import { AssignmentProgressStateValue } from "src/domain/util/enums";
import { AssignmentId } from "src/domain/values/ids";
import { inject, injectable } from "tsyringe";

export interface ParticipantPaginationProps {
  readonly page: number;
  readonly size: number;
  readonly assignmentStates: AssignmentStateProps[];
}

export interface AssignmentStateProps {
  readonly assignmentId: AssignmentId;
  readonly assignmentProgressState: AssignmentProgressStateValue;
}

@injectable()
export class GetParticipantsWithAssignmentsPagedQuery implements IGetQuery<Participant[], ParticipantPaginationProps> {
  constructor(
    @inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(props: ParticipantPaginationProps): Promise<Participant[]> {
    const allParticipants = await this.participantRepository.getAllWithAssignments();
    const filteredParticipants = this.filterByAssignmentState(allParticipants, props.assignmentStates);
    const paginatedParticipants = this.paginate(filteredParticipants, props.page, props.size);
    return paginatedParticipants.map(participantWithAssignments => participantWithAssignments.participant);
  }

  private filterByAssignmentState(participants: ParticipantWithAssignments[], assignmentStates: AssignmentStateProps[]): ParticipantWithAssignments[] {
    return participants.filter(participant =>
      assignmentStates.every(state =>
        participant.assignmentProgress.some(assignment =>
          assignment.assignmentId.isEqual(state.assignmentId) && assignment.assignmentProgressState == state.assignmentProgressState
        )
      )
    );
  }

  private paginate(participants: ParticipantWithAssignments[], page: number, size: number): ParticipantWithAssignments[] {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    return participants.slice(startIndex, endIndex);
  }
}
