import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { Administrator } from "../entities/administrator";

export class AdministratorCreateService {
  constructor(private repo: IAdministratorRepository) { }
}