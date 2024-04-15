import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { GetAllParticipantsUsecase } from 'src/app/participant/get-all-participants-usecase';
import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseSuccessResponse } from 'src/app/responses/usecase-responses';
import { GetPairsResponse } from 'src/controller/participant/response/get-all-participants-response';
import { container } from 'tsyringe';

@Controller({
  path: 'participant',
})
export class ParticipantController {
  @Get('all')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Request succeed.', type: String })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  async getAllParticipants(
    @Res() res: Response,
  ): Promise<void> {
    const usecase = container.resolve(GetAllParticipantsUsecase);
    const result = await usecase.execute();
    if (result instanceof UsecaseSuccessResponse) {
      const response = new GetPairsResponse(result.value);
      res.status(HttpStatus.CREATED).send(response);
    } else if (result instanceof ExpectedErrorResponse) {
      res.status(HttpStatus.BAD_REQUEST).send();
    } else if (result instanceof UnExpectedErrorResponse) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  // TODO: get paged

  // TODO: add new participant

  // TODO: enroll participant

  // TODO: leave participant

  // TODO: withdrawn participant
}
