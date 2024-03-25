
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

export function setupRepositoriesDI() {
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