import { EntityError } from "src/domain/errors/entity_error";
import { Id } from "src/domain/values/id";

export function validateProps<T extends object>(id: Id, props: T): void {
  if (!id) {
    throw new EntityError(`ID is required`);
  }
  Object.entries(props).forEach(([key, value]) => {
    if (!value) {
      throw new EntityError(`${key} is required`);
    }
  });
}