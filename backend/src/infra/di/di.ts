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
import { AdministratorCreateService } from "src/domain/services/administrator/administrator-create-service";
import { ChangeAdministratorEmailService } from "src/domain/services/administrator/change-administrator-email-service";
import { ChangeAssignmentProgressService } from "src/domain/services/assignment/change-assignment-progress-service";
import { CategoryChangeNameService } from "src/domain/services/category/category-change-name-service";
import { CategoryCreateService } from "src/domain/services/category/category-create-service";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { ReallocateLastParticipantInPairService } from "src/domain/services/pair/reallocate-last-participant-in-pair-service";
import { ParticipantToEnrollService } from "src/domain/services/participant/participant-to-enroll-service";
import { ParticipantToOnLeaveService } from "src/domain/services/participant/participant-to-on-leave-service";
import { ParticipantToWithDrownService } from "src/domain/services/participant/participant-to-with-drown-service";
import { TeamMemberValidationService } from "src/domain/services/team/team-member-validation-service";
import { PrismaAdministratorRepository } from "src/infra/db/repositories/prisma/administrator-repository";
import { PrismaAssignmentProgressRepository } from "src/infra/db/repositories/prisma/assignment-progress-repository";
import { PrismaAssignmentRepository } from "src/infra/db/repositories/prisma/assignment-repository";
import { PrismaCategoryRepository } from "src/infra/db/repositories/prisma/category-repository";
import { PrismaPairRepository } from "src/infra/db/repositories/prisma/pair-repository";
import { PrismaParticipantRepository } from "src/infra/db/repositories/prisma/participant-repository";
import { PrismaTeamRepository } from "src/infra/db/repositories/prisma/team-repository";
import { PrismaTransactionRepository } from "src/infra/db/repositories/prisma/transaction-repository";
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

  container.register('IGetTeamByIdQuery', {
    useClass: GetTeamByIdQuery
  })

  container.register('ISaveTeamCommand', {
    useClass: SaveTeamCommand
  })

  container.register('IChangeAdministratorEmailService', {
    useClass: ChangeAdministratorEmailService
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

  container.register('IChangeAssignmentProgressService', {
    useValue: ChangeAssignmentProgressService
  })

  container.register('IReallocateLastParticipantInPairService', {
    useClass: ReallocateLastParticipantInPairService
  })

  container.register('ITeamMemberValidationService', {
    useClass: TeamMemberValidationService
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
    useClass: PrismaAdministratorRepository
  })

  container.register('IAssignmentProgressRepository', {
    useClass: PrismaAssignmentProgressRepository
  })

  container.register('IAssignmentRepository', {
    useClass: PrismaAssignmentRepository
  })

  container.register('ICategoryRepository', {
    useClass: PrismaCategoryRepository
  })

  container.register('IMailSenderRepository', {
    useClass: MockAdminEmailSendService
  })

  container.register('IPairRepository', {
    useClass: PrismaPairRepository
  })

  container.register('IParticipantRepository', {
    useClass: PrismaParticipantRepository
  })

  container.register('ITeamRepository', {
    useClass: PrismaTeamRepository
  })

  container.register('ITransactionRepository', {
    useClass: PrismaTransactionRepository
  })
}
