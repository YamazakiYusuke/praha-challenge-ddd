import { ChangeAdministratorEmailService } from "src/domain/services/administrator/change-administrator-email-service";
import { CreateAdministratorService } from "src/domain/services/administrator/create-administrator-service";
import { ChangeAssignmentProgressService } from "src/domain/services/assignment/change-assignment-progress-service";
import { ChangeCategoryNameService } from "src/domain/services/category/change-category-name-service";
import { CreateCategoryService } from "src/domain/services/category/create-category-service";
import { CreatePairService } from "src/domain/services/pair/create-pair-service";
import { ReallocateLastParticipantInPairService } from "src/domain/services/pair/reallocate-last-participant-in-pair-service";
import { EnrollParticipantService } from "src/domain/services/participant/enroll-participant-service";
import { LeaveParticipantService } from "src/domain/services/participant/leave-participant-service";
import { WithdrawnParticipantService } from "src/domain/services/participant/withdrawn-participant-service";
import { ValidateTeamMemberService } from "src/domain/services/team/validate-team-member-service";
import { container } from "tsyringe";


export function setupDomainServicesDI() {
  container.register('IChangeAdministratorEmailService', {
    useClass: ChangeAdministratorEmailService
  })

  container.register('ICreateAdministratorService', {
    useClass: CreateAdministratorService
  })

  container.register('IChangeCategoryNameService', {
    useClass: ChangeCategoryNameService
  })

  container.register('ICreateCategoryService', {
    useClass: CreateCategoryService
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

  container.register('IValidateTeamMemberService', {
    useClass: ValidateTeamMemberService
  })

  container.register('IEnrollParticipantService', {
    useClass: EnrollParticipantService
  })

  container.register('ILeaveParticipantService', {
    useClass: LeaveParticipantService
  })

  container.register('IWithdrawnParticipantService', {
    useClass: WithdrawnParticipantService
  })
}