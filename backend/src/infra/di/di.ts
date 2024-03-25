import { setupCommandsDI } from "src/infra/di/children/commands";
import { setupDomainServicesDI } from "src/infra/di/children/domain-services";
import { setupRepositoriesDI } from "src/infra/di/children/repositories";

export function setupDI() {
  setupCommandsDI()
  setupDomainServicesDI()
  setupRepositoriesDI()
}
