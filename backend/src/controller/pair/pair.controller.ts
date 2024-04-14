import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetAllPairsUsecase } from 'src/app/pair/get-all-pairs-usecase';
import { ExpectedErrorResponse, SuccessResponse, UnExpectedErrorResponse } from 'src/app/responses/usecase-responses';
import { GetPairsResponse } from 'src/controller/pair/response/get-pairs-response';
import { container } from 'tsyringe';

@Controller({
  path: 'pair',
})
export class PairController {
  @Get()
  async getPairs(
    @Res() res: Response,
  ): Promise<void> {
    const usecase = container.resolve(GetAllPairsUsecase);
    const result = await usecase.execute();
    if (result instanceof SuccessResponse) {
      const response = new GetPairsResponse(result.value);
      res.status(HttpStatus.CREATED).send(response);
    } else if (result instanceof ExpectedErrorResponse) {
      res.status(HttpStatus.BAD_REQUEST).send();
    } else if (result instanceof UnExpectedErrorResponse) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
