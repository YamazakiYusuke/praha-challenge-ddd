import { GetParticipantByEmailQuery } from 'src/domain/commands/participant/get-participant-by-email-query';
import { Participant } from "src/domain/entities/participant";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { EnrollParticipantService } from 'src/domain/services/participant/enroll-participant-service';
import { inject, injectable } from "tsyringe";

@injectable()
export class AddNewParticipantService {
  constructor(
    @inject(EnrollParticipantService)
    private readonly enrollParticipantService: EnrollParticipantService,
    @inject(GetParticipantByEmailQuery)
    private readonly getParticipantByEmailQuery: GetParticipantByEmailQuery,
  ) { }

  async execute(participant: Participant): Promise<void> {
    const result = await this.getParticipantByEmailQuery.execute(participant.email);
    if (result instanceof Participant) {
      throw new DomainServiceError('すでに登録済みのEmailです');
    }
    await this.enrollParticipantService.execute(participant);
  }
}