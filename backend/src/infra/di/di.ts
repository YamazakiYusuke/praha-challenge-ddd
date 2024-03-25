import { setupDomainServicesDI } from "src/infra/di/children/domain-services";
import { setupRepositoriesDI } from "src/infra/di/children/repositories";

export function setupDI() {
  setupDomainServicesDI()
  setupRepositoriesDI()
}
