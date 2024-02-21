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
import { SaveTeamCommand } from "src/domain/commands/team/save-team-command";
import { AdministratorChangeEmailService } from "src/domain/services/administrator/administrator-change-email-service";
import { AdministratorCreateService } from "src/domain/services/administrator/administrator-create-service";
import { CategoryChangeNameService } from "src/domain/services/category/category-change-name-service";
import { CategoryCreateService } from "src/domain/services/category/category-create-service";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { ParticipantToEnrollService } from "src/domain/services/participant/participant-to-enroll-service";
import { ParticipantToOnLeaveService } from "src/domain/services/participant/participant-to-on-leave-service";
import { ParticipantToWithDrownService } from "src/domain/services/participant/participant-to-with-drown-service";
import { InMemoryAdministratorRepository } from "src/infra/db/repositories/in-memory/administrator-repository";
import { InMemoryAssignmentProgressRepository } from "src/infra/db/repositories/in-memory/assignment-progress-repository";
import { InMemoryAssignmentRepository } from "src/infra/db/repositories/in-memory/assignment-repository";
import { InMemoryCategoryRepository } from "src/infra/db/repositories/in-memory/category-repository";
import { InMemoryPairRepository } from "src/infra/db/repositories/in-memory/pair-repository";
import { InMemoryParticipantRepository } from "src/infra/db/repositories/in-memory/participant-repository";
import { InMemoryTeamRepository } from "src/infra/db/repositories/in-memory/team-repository";
import { MockAdminEmailSendService } from "src/infra/mail/repositories/mock/mock-amin-email-send-service";
import { container } from "tsyringe";

export function setupDI() {

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

  container.register('ISaveTeamCommand', {
    useClass: SaveTeamCommand
  })

  container.register('IAdministratorChangeEmailService', {
    useClass: AdministratorChangeEmailService
  })

  container.register('IAdministratorCreateService', {
    useClass: AdministratorCreateService
  })

  container.register('ICategoryChangeNameService', {
    useClass: CategoryChangeNameService
  })

  container.register('ICategoryCreateService', {
    useClass: CategoryCreateService
  })

  container.register('ICreatePairService', {
    useClass: CreatePairService
  })

  container.register('IEnrollParticipantService', {
    useClass: EnrollParticipantService
  })

  container.register('IParticipantToEnrollService', {
    useClass: ParticipantToEnrollService
  })

  container.register('IParticipantToOnLeaveService', {
    useClass: ParticipantToOnLeaveService
  })

  container.register('IParticipantToWithDrownService', {
    useClass: ParticipantToWithDrownService
  })

  container.register('IAdministratorRepository', {
    useClass: InMemoryAdministratorRepository
  })

  container.register('IAssignmentProgressRepository', {
    useClass: InMemoryAssignmentProgressRepository
  })

  container.register('IAssignmentRepository', {
    useClass: InMemoryAssignmentRepository
  })

  container.register('ICategoryRepository', {
    useClass: InMemoryCategoryRepository
  })

  container.register('IPairRepository', {
    useClass: InMemoryPairRepository
  })

  container.register('IParticipantRepository', {
    useClass: InMemoryParticipantRepository
  })

  container.register('ITeamRepository', {
    useClass: InMemoryTeamRepository
  })

  container.register('IMailSenderRepository', {
    useClass: MockAdminEmailSendService
  })
}
