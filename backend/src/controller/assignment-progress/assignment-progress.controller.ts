import { Body, Controller, Put } from '@nestjs/common';
import { ChangeAssignmentProgressUsecase } from 'src/app/assignment-progress/change-assignment-progress-usecase';
import { AssignmentProgressDto } from 'src/app/assignment-progress/dto/assignment-progress-dto';
import { container } from 'tsyringe';

@Controller({
  path: 'assignment_progress',
})
export class AssignmentProgressController {
  @Put()
  async putAssignmentProgress(
    @Body() assignmentProgressDto: AssignmentProgressDto,
    @Body() newState: number,
  ): Promise<void> {
    const usecase = container.resolve(ChangeAssignmentProgressUsecase);
    await usecase.execute({
      assignmentProgressDto: assignmentProgressDto,
      newState: newState,
    })
  }
}
