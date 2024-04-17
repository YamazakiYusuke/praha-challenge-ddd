import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseErrorResponse, UsecaseSuccessResponse } from "src/app/responses/usecase-responses";
import { GetParticipantByEmailQuery } from "src/domain/commands/participant/get-participant-by-email-query";
import { Participant } from "src/domain/entities/participant";
import { BaseError } from "src/domain/errors/base/base_error";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { Email } from "src/domain/values/email";
import { PersonName } from "src/domain/values/name";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddNewParticipantUsecase {
  constructor(
    @inject(EnrollParticipantService)
    private readonly enrollParticipantService: EnrollParticipantService,
    @inject(GetParticipantByEmailQuery)
    private readonly getParticipantByEmailQuery: GetParticipantByEmailQuery,
  ) { }

  async execute(name: string, email: string): Promise<UsecaseSuccessResponse<null> | UsecaseErrorResponse> {
    try {
      const result = await this.getParticipantByEmailQuery.execute(PersonName.create(name));
      if (result instanceof Participant) {
        return new ExpectedErrorResponse();
      }
      const newParticipant = Participant.create({ name: PersonName.create(name), email: Email.create(email) });
      await this.enrollParticipantService.execute(newParticipant);
      return new UsecaseSuccessResponse(null);
    } catch (e: any) {
      if (e instanceof BaseError) {
        return new ExpectedErrorResponse();
      } else {
        return new UnExpectedErrorResponse();
      }
    }
  }
}
