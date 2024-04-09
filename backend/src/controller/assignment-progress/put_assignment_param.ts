import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AssignmentProgressDto } from "src/app/assignment-progress/dto/assignment-progress-dto";

export class PutAssignmentProgressParam {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly id!: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly assignmentId!: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly participantId!: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly assignmentProgressState!: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly newState!: number;
}
