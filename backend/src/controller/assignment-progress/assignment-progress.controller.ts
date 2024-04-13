import { Body, Controller, HttpStatus, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChangeAssignmentProgressUsecase } from 'src/app/assignment-progress/change-assignment-progress-usecase';
import { AssignmentProgressDto } from 'src/app/assignment-progress/dto/assignment-progress-dto';
import { ExpectedErrorResponse, SuccessResponse, UnExpectedErrorResponse } from 'src/app/responses/usecase-responses';
import { PutAssignmentProgressRequest } from 'src/controller/assignment-progress/request/put_assignment_request';
import { container } from 'tsyringe';

@Controller({
  path: 'assignment_progress',
})
export class AssignmentProgressController {
  @Put()
  async putAssignmentProgress(
    @Res() res: Response,
    @Body() putAssignmentProgressParam: PutAssignmentProgressRequest,
  ): Promise<void> {
    const dto = new AssignmentProgressDto({
      id: putAssignmentProgressParam.id,
      assignmentId: putAssignmentProgressParam.assignmentId,
      participantId: putAssignmentProgressParam.participantId,
      assignmentProgressState: putAssignmentProgressParam.assignmentProgressState
    })
    const usecase = container.resolve(ChangeAssignmentProgressUsecase);
    const result = await usecase.execute({
      assignmentProgressDto: dto,
      newState: putAssignmentProgressParam.newState,
    })
    if (result instanceof SuccessResponse) {
      res.status(HttpStatus.CREATED).send();
    } else if (result instanceof ExpectedErrorResponse) {
      res.status(HttpStatus.BAD_REQUEST).send();
    } else if (result instanceof UnExpectedErrorResponse) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
