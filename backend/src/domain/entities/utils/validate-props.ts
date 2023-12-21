import { EntityCreationError } from "src/domain/errors/entity_error";
import { Id } from "src/domain/values/id";

export function validateProps<T extends object>(id: Id, props: T): void {
  if (!id) {
    throw new EntityCreationError(`ID is required`);
  }
  Object.entries(props).forEach(([key, value]) => {
    if (!value) {
      throw new EntityCreationError(`${key} is required`);
    }
  });
}