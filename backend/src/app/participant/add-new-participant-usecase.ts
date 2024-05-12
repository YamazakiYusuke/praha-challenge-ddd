import { ExpectedErrorResponse, UnExpectedErrorResponse, UsecaseErrorResponse, UsecaseSuccessResponse } from "src/app/responses/usecase-responses";
import { Participant } from "src/domain/entities/participant";
import { BaseError } from "src/domain/errors/base/base_error";
import { AddNewParticipantService } from "src/domain/services/participant/add-new-participant-service";
import { Email } from "src/domain/values/email";
import { PersonName } from "src/domain/values/name";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddNewParticipantUsecase {
  constructor(
    @inject(AddNewParticipantService)
    private readonly addNewParticipantService: AddNewParticipantService,
  ) { }

  async execute(name: string, email: string): Promise<UsecaseSuccessResponse<null> | UsecaseErrorResponse> {
    try {
      const newParticipant = Participant.create({ name: PersonName.create(name), email: Email.create(email) });
      await this.addNewParticipantService.execute(newParticipant);
      return new UsecaseSuccessResponse(null);
    } catch (e: any) {
      console.error('AddNewParticipantUsecase:', e);
      if (e instanceof BaseError) {
        return new ExpectedErrorResponse();
      } else {
        return new UnExpectedErrorResponse();
      }
    }
  }
}
