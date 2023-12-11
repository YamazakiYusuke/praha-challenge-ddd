import { Participant, ParticipantProps } from "src/domain/entities/participant";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { GetOneParticipantQuery } from "src/domain/commands/participant/get-one-participant-query";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ParticipantCreateService {
  constructor(private readonly getOneParticipantQuery: GetOneParticipantQuery) {}

  async execute(props: ParticipantProps): Promise<Participant | EntityCreationError> {
    const participant = await this.getOneParticipantQuery.execute(props.email);
    if (participant != null) {
      throw new EntityCreationError('こちらのEmailは既に登録済みです');
    }
    return Participant.create(props);
  }
}