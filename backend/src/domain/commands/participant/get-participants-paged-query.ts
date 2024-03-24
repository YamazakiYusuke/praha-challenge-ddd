import { Inject, Injectable } from "@nestjs/common";
import { IGetQuery } from "src/domain/commands/base/get-query";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository, ParticipantWithAssignments } from "src/domain/repositories/participant-repository";
import { AssignmentProgressState } from "src/domain/values/assignment-progress-state";
import { AssignmentId } from "src/domain/values/id";

export interface ParticipantPaginationProps {
  page: number;
  size: number;
  assignmentStates: AssignmentStateProps[];
}

export interface AssignmentStateProps {
  assignmentId: AssignmentId;
  assignmentProgressState: AssignmentProgressState;
}

export interface IGetParticipantsWithAssignmentsPagedQuery extends IGetQuery<Participant[], ParticipantPaginationProps> {
  execute(props: ParticipantPaginationProps): Promise<Participant[]>;
}

@Injectable()
export class GetParticipantsWithAssignmentsPagedQuery implements IGetParticipantsWithAssignmentsPagedQuery {
  constructor(
    @Inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(props: ParticipantPaginationProps): Promise<Participant[]> {
    const allParticipants = await this.participantRepository.getAllWithAssignments() as ParticipantWithAssignments[];
    const filteredParticipants = this.filterByAssignmentState(allParticipants, props.assignmentStates);
    const paginatedParticipants = this.paginate(filteredParticipants, props.page, props.size);
    return paginatedParticipants.map(participantWithAssignments => participantWithAssignments.participant);
  }

  private filterByAssignmentState(participants: ParticipantWithAssignments[], assignmentStates: AssignmentStateProps[]): ParticipantWithAssignments[] {
    return participants.filter(participant => 
      assignmentStates.every(state => 
        participant.assignmentProgress.some(assignment => 
          assignment.assignmentId.isEqual(state.assignmentId) && assignment.assignmentProgressState.isEqual(state.assignmentProgressState)
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
