import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Dto } from "src/app/base/dto";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { AssignmentId, AssignmentProgressId, ParticipantId } from "src/domain/values/ids";

export class AssignmentProgressDto extends Dto<AssignmentProgress> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public readonly id: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public readonly assignmentId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public readonly participantId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public readonly assignmentProgressState: number;

  constructor(assignmentProgress: AssignmentProgress) {
    super();
    this.id = assignmentProgress.id.value;
    this.assignmentId = assignmentProgress.assignmentId.value;
    this.participantId = assignmentProgress.participantId.value;
    this.assignmentProgressState = assignmentProgress.assignmentProgressState;
  }

  get toEntity(): AssignmentProgress {
    const assignmentProgressId = AssignmentProgressId.restore(this.id);
    const assignmentId = AssignmentId.restore(this.assignmentId);
    const participantId = ParticipantId.restore(this.participantId);
    const assignmentProgressState = this.assignmentProgressState;

    return AssignmentProgress.restore(assignmentProgressId, {
      assignmentId,
      participantId,
      assignmentProgressState,
    });
  }
}


