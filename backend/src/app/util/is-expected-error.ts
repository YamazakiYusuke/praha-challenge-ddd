import { CommandError } from "src/domain/errors/command_error";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { EntityError } from "src/domain/errors/entity_error";
import { ValueObjectError } from "src/domain/errors/value_object_error";

export function isExpectedError(e: any): boolean {
  return e instanceof EntityError || e instanceof ValueObjectError || e instanceof DomainServiceError || e instanceof CommandError;
}