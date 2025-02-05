import { Body, Controller, HttpStatus, Put, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ChangeAssignmentProgressUsecase } from 'src/app/assignment-progress/change-assignment-progress-usecase';
import { AssignmentProgressDto } from 'src/app/assignment-progress/dto/assignment-progress-dto';
import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseSuccessResponse } from 'src/app/responses/usecase-responses';
import { PutAssignmentProgressRequest } from 'src/controller/assignment-progress/request/put-assignment-request';
import { container } from 'tsyringe';

@Controller({
  path: 'assignment_progress',
})
export class AssignmentProgressController {
  @Put()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Request succeed.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  async putAssignmentProgress(
    @Res() res: Response,
    @Body() putAssignmentProgressRequest: PutAssignmentProgressRequest,
  ): Promise<void> {
    const usecase = container.resolve(ChangeAssignmentProgressUsecase);
    const result = await usecase.execute({
      assignmentProgressStringId: putAssignmentProgressRequest.id,
      newState: putAssignmentProgressRequest.assignmentProgressState,
    })
    if (result instanceof UsecaseSuccessResponse) {
      res.status(HttpStatus.CREATED).send();
    } else if (result instanceof ExpectedErrorResponse) {
      res.status(HttpStatus.BAD_REQUEST).send();
    } else if (result instanceof UnExpectedErrorResponse) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
