import { Injectable } from "@nestjs/common";
import { GetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { Participant } from "src/domain/entities/participant";

@Injectable()
export class ParticipantToWithDrownUseCase {
  constructor(
    private readonly getPairWithFewestMembersQuery: GetPairWithFewestMembersQuery,
  ) { }

  async execute(participant: Participant): Promise<void | Error> {
  }
}
