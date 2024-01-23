import { Injectable, Inject } from "@nestjs/common";
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
  execute(props: ParticipantPaginationProps): Promise<Participant[] | Error>;
}

@Injectable()
export class GetParticipantsWithAssignmentsPagedQuery implements IGetParticipantsWithAssignmentsPagedQuery {
  constructor(
    @Inject('IParticipantRepository')
    private readonly participantRepository: IParticipantRepository
  ) { }

  async execute(props: ParticipantPaginationProps): Promise<Participant[] | Error> {
    const all = await this.participantRepository.getAllWithAssignments() as ParticipantWithAssignments[];
    const filtered = this.filterParticipantsByAssignmentState(all, props.assignmentStates);
    const paginated = this.paginateParticipants(filtered, props.page, props.size);
    return paginated.map((e) => e.participant);
  }

  private filterParticipantsByAssignmentState(participants: ParticipantWithAssignments[], assignmentStates: AssignmentStateProps[]): ParticipantWithAssignments[] {
    return participants.filter(pwa => {
      return assignmentStates.every(as => {
        return pwa.assignmentProgress.some(a => {
          return a.assignmentId.isEqual(as.assignmentId) && a.assignmentProgressState.isEqual(as.assignmentProgressState);
        });
      });
    });
  }

  private paginateParticipants(participants: ParticipantWithAssignments[], page: number, size: number): ParticipantWithAssignments[] {
    const start = (page - 1) * size;
    const end = start + size;
    return participants.slice(start, end);
  }
}
