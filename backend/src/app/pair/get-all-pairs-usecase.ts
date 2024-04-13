import { PairDto } from "src/app/pair/dto/pair-dto";
import { GetAllPairsQuery } from "src/domain/commands/pair/get-all-pairs-query";
import { BaseError } from "src/domain/errors/base/base_error";
import { inject, injectable } from "tsyringe";
import { ExpectedErrorResponse, SuccessResponse, UnExpectedErrorResponse, UsecaseResponse } from "../responses/usecase-responses";

@injectable()
export class GetAllPairsUsecase {
  constructor(
    @inject(GetAllPairsQuery)
    private readonly getAllPairsQuery: GetAllPairsQuery,
  ) { }

  public async execute(): Promise<UsecaseResponse> {
    try {
      const pairs = await this.getAllPairsQuery.execute();
      const value = pairs.map((pair) => new PairDto(pair));
      return new SuccessResponse<PairDto[]>(value);
    } catch (e: any) {
      if (e instanceof BaseError) {
        return new ExpectedErrorResponse();
      } else {
        return new UnExpectedErrorResponse();
      }
    }
  }
}