import { Body, Controller, Get, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AddNewParticipantUsecase } from 'src/app/participant/add-new-participant-usecase';
import { EnrollParticipantUseCase } from 'src/app/participant/enroll-participant-usecase';
import { GetAllParticipantsUsecase } from 'src/app/participant/get-all-participants-usecase';
import { GetParticipantsPagedUsecase } from 'src/app/participant/get-participants-paged-usecase';
import { LeaveParticipantUseCase } from 'src/app/participant/leave-participant-usecase';
import { WithdrawnParticipantUseCase } from 'src/app/participant/withdrawn-participant-usecase';
import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseSuccessResponse } from 'src/app/responses/usecase-responses';
import { ParticipantRequest } from 'src/controller/participant/request/get-participants-paged-request';
import { GetParticipantsPagedRequest } from 'src/controller/participant/request/get-participants-paged-request copy';
import { GetAllParticipantsResponse } from 'src/controller/participant/response/get-all-participants-response';
import { GetParticipantsPagedResponse } from 'src/controller/participant/response/get-participants-paged-response';
import { container } from 'tsyringe';

@Controller({
  path: 'participant',
})
export class ParticipantController {
  @Get('all')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Request succeed.', type: GetAllParticipantsResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  async getAllParticipants(
    @Res() res: Response,
  ): Promise<void> {
    const usecase = container.resolve(GetAllParticipantsUsecase);
    const result = await usecase.execute();
    if (result instanceof UsecaseSuccessResponse) {
      const response = new GetAllParticipantsResponse(result.value);
      res.status(HttpStatus.CREATED).send(response);
    } else if (result instanceof ExpectedErrorResponse) {
      res.status(HttpStatus.BAD_REQUEST).send();
    } else if (result instanceof UnExpectedErrorResponse) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Get('paged')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Request succeed.', type: GetParticipantsPagedResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  async getParticipantsPaged(
    @Res() res: Response,
    @Body() getParticipantsPagedRequest: GetParticipantsPagedRequest,
  ): Promise<void> {
    const usecase = container.resolve(GetParticipantsPagedUsecase);
    const props = getParticipantsPagedRequest.toProps;
    const result = await usecase.execute(props);
    if (result instanceof UsecaseSuccessResponse) {
      const response = new GetParticipantsPagedResponse(result.value, getParticipantsPagedRequest);
      res.status(HttpStatus.CREATED).send(response);
    } else if (result instanceof ExpectedErrorResponse) {
      res.status(HttpStatus.BAD_REQUEST).send();
    } else if (result instanceof UnExpectedErrorResponse) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Request succeed.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  async addNewParticipant(
    @Res() res: Response,
    @Body() participantRequest: ParticipantRequest,
  ): Promise<void> {
    const usecase = container.resolve(AddNewParticipantUsecase);
    const props = participantRequest.toProps;
    const result = await usecase.execute(props);
    if (result instanceof UsecaseSuccessResponse) {
      res.status(HttpStatus.CREATED).send();
    } else if (result instanceof ExpectedErrorResponse) {
      res.status(HttpStatus.BAD_REQUEST).send();
    } else if (result instanceof UnExpectedErrorResponse) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Put('enroll')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Request succeed.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  async enrollParticipant(
    @Res() res: Response,
    @Body() participantRequest: ParticipantRequest,
  ): Promise<void> {
    const usecase = container.resolve(EnrollParticipantUseCase);
    const props = participantRequest.toProps;
    const result = await usecase.execute(props);
    if (result instanceof UsecaseSuccessResponse) {
      res.status(HttpStatus.CREATED).send();
    } else if (result instanceof ExpectedErrorResponse) {
      res.status(HttpStatus.BAD_REQUEST).send();
    } else if (result instanceof UnExpectedErrorResponse) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Put('leave')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Request succeed.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  async leaveParticipant(
    @Res() res: Response,
    @Body() participantRequest: ParticipantRequest,
  ): Promise<void> {
    const usecase = container.resolve(LeaveParticipantUseCase);
    const props = participantRequest.toProps;
    const result = await usecase.execute(props);
    if (result instanceof UsecaseSuccessResponse) {
      res.status(HttpStatus.CREATED).send();
    } else if (result instanceof ExpectedErrorResponse) {
      res.status(HttpStatus.BAD_REQUEST).send();
    } else if (result instanceof UnExpectedErrorResponse) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
  
  @Put('withdrawn')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Request succeed.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  async withdrawnParticipant(
    @Res() res: Response,
    @Body() participantRequest: ParticipantRequest,
  ): Promise<void> {
    const usecase = container.resolve(WithdrawnParticipantUseCase);
    const props = participantRequest.toProps;
    const result = await usecase.execute(props);
    if (result instanceof UsecaseSuccessResponse) {
      res.status(HttpStatus.CREATED).send();
    } else if (result instanceof ExpectedErrorResponse) {
      res.status(HttpStatus.BAD_REQUEST).send();
    } else if (result instanceof UnExpectedErrorResponse) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
