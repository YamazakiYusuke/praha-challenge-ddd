import { GetAdministratorByEmailQuery } from "src/domain/commands/administrator/get-administrator-by-email-query";
import { GetAllAdministratorsQuery } from "src/domain/commands/administrator/get-all-administrator-query";
import { SaveAdministratorCommand } from "src/domain/commands/administrator/save-administrator-command";
import { GetAllAssignmentProgressQuery } from "src/domain/commands/assignment-progress/get-all-assignment-progress-query";
import { GetAssignmentProgressByIdQuery } from "src/domain/commands/assignment-progress/get-assignment-progress-by-id-query";
import { SaveAssignmentProgressCommand } from "src/domain/commands/assignment-progress/save-assignment-progress-command";
import { GetAllAssignmentsQuery } from "src/domain/commands/assignment/get-all-assignment-query";
import { SaveAssignmentCommand } from "src/domain/commands/assignment/save-assignment-command";
import { GetAllCategoryQuery } from "src/domain/commands/category/get-all-category-query";
import { GetCategoryByNameQuery } from "src/domain/commands/category/get-one-category-by-name-query";
import { SaveCategoryCommand } from "src/domain/commands/category/save-category-command";
import { GetAllPairsQuery } from "src/domain/commands/pair/get-all-pairs-query";
import { GetPairByIdQuery } from "src/domain/commands/pair/get-pair-by-id-query";
import { GetPairByNameQuery } from "src/domain/commands/pair/get-pair-by-name-query";
import { GetPairWithFewestMembersByTeamIdQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-by-team-id-query";
import { GetPairWithFewestMembersQuery } from "src/domain/commands/pair/get-pair-with-fewest-members-query";
import { GetPairsByTeamIdQuery } from "src/domain/commands/pair/get-pairs-by-team-id-query";
import { SavePairCommand } from "src/domain/commands/pair/save-pair-command";
import { GetAllParticipantsQuery } from "src/domain/commands/participant/get-all-participants-query";
import { GetParticipantByEmailQuery } from "src/domain/commands/participant/get-participant-by-email-query";
import { GetParticipantByIdQuery } from "src/domain/commands/participant/get-participant-by-id-query";
import { GetParticipantsWithAssignmentsPagedQuery } from "src/domain/commands/participant/get-participants-paged-query";
import { GetAllTeamsQuery } from "src/domain/commands/team/get-all-team-query";
import { GetTeamByIdQuery } from "src/domain/commands/team/get-team-by-id-query";
import { SaveTeamCommand } from "src/domain/commands/team/save-team-command";
import { container } from "tsyringe";

export function setupCommandsDI() {
  container.register('IGetAdministratorByEmailQuery', {
    useClass: GetAdministratorByEmailQuery
  })

  container.register('IGetAllAdministratorsQuery', {
    useClass: GetAllAdministratorsQuery
  })

  container.register('ISaveAdministratorCommand', {
    useClass: SaveAdministratorCommand
  })

  container.register('IGetAllAssignmentsQuery', {
    useClass: GetAllAssignmentsQuery
  })

  container.register('ISaveAssignmentCommand', {
    useClass: SaveAssignmentCommand
  })

  container.register('IGetAllAssignmentProgressQuery', {
    useClass: GetAllAssignmentProgressQuery
  })

  container.register('IGetAssignmentProgressByIdQuery', {
    useClass: GetAssignmentProgressByIdQuery
  })

  container.register('ISaveAssignmentProgressCommand', {
    useClass: SaveAssignmentProgressCommand
  })

  container.register('IGetAllCategoryQuery', {
    useClass: GetAllCategoryQuery
  })

  container.register('IGetCategoryByNameQuery', {
    useClass: GetCategoryByNameQuery
  })

  container.register('ISaveCategoryCommand', {
    useClass: SaveCategoryCommand
  })

  container.register('IGetAllPairsQuery', {
    useClass: GetAllPairsQuery
  })

  container.register('IGetPairByIdQuery', {
    useClass: GetPairByIdQuery
  })

  container.register('IGetPairByNameQuery', {
    useClass: GetPairByNameQuery
  })

  container.register('IGetPairWithFewestMembersByTeamIdQuery', {
    useClass: GetPairWithFewestMembersByTeamIdQuery
  })

  container.register('IGetPairWithFewestMembersQuery', {
    useClass: GetPairWithFewestMembersQuery
  })

  container.register('IGetPairsByTeamIdQuery', {
    useClass: GetPairsByTeamIdQuery
  })

  container.register('ISavePairCommand', {
    useClass: SavePairCommand
  })

  container.register('IGetAllParticipantsQuery', {
    useClass: GetAllParticipantsQuery
  })

  container.register('IGetParticipantByEmailQuery', {
    useClass: GetParticipantByEmailQuery
  })

  container.register('IGetParticipantByIdQuery', {
    useClass: GetParticipantByIdQuery
  })

  container.register('IGetParticipantsWithAssignmentsPagedQuery', {
    useClass: GetParticipantsWithAssignmentsPagedQuery
  })

  container.register('IGetAllTeamsQuery', {
    useClass: GetAllTeamsQuery
  })

  container.register('IGetTeamByIdQuery', {
    useClass: GetTeamByIdQuery
  })

  container.register('ISaveTeamCommand', {
    useClass: SaveTeamCommand
  })
}