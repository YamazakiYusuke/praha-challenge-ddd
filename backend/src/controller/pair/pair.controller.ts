import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { GetAllPairsUsecase } from 'src/app/pair/get-all-pairs-usecase';
import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseSuccessResponse } from 'src/app/responses/usecase-responses';
import { GetAllPairsResponse } from 'src/controller/pair/response/get-all-pairs-response';
import { container } from 'tsyringe';

@Controller({
  path: 'pair',
})
export class PairController {
  @Get('all')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Request succeed.', type: GetAllPairsResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  async getAllPairs(
    @Res() res: Response,
  ): Promise<void> {
    const usecase = container.resolve(GetAllPairsUsecase);
    const result = await usecase.execute();
    if (result instanceof UsecaseSuccessResponse) {
      const response = new GetAllPairsResponse(result.value);
      res.status(HttpStatus.CREATED).send(response);
    } else if (result instanceof ExpectedErrorResponse) {
      res.status(HttpStatus.BAD_REQUEST).send();
    } else if (result instanceof UnExpectedErrorResponse) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
