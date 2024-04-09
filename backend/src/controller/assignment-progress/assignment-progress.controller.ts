import { Body, Controller, Put } from '@nestjs/common';
import { ChangeAssignmentProgressUsecase } from 'src/app/assignment-progress/change-assignment-progress-usecase';
import { AssignmentProgressDto } from 'src/app/assignment-progress/dto/assignment-progress-dto';
import { PutAssignmentProgressParam } from 'src/controller/assignment-progress/put_assignment_param';
import { container } from 'tsyringe';

@Controller({
  path: 'assignment_progress',
})
export class AssignmentProgressController {
  @Put()
  async putAssignmentProgress(
    @Body() putAssignmentProgressParam: PutAssignmentProgressParam,
  ): Promise<void> {
    const dto = new AssignmentProgressDto({
      id: putAssignmentProgressParam.id,
      assignmentId: putAssignmentProgressParam.assignmentId,
      participantId: putAssignmentProgressParam.participantId,
      assignmentProgressState: putAssignmentProgressParam.assignmentProgressState
    })
    const usecase = container.resolve(ChangeAssignmentProgressUsecase);
    await usecase.execute({
      assignmentProgressDto: dto,
      newState: putAssignmentProgressParam.newState,
    })
  }
}
