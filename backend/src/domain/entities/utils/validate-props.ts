import { EntityError } from "src/domain/errors/entity_error";
import { Id } from "src/domain/values/id";

export function validateProps<T extends object>(id: Id, props: T , unCheckKeys: string[] = []): void {
  if (!id) {
    throw new EntityError(`ID is required`);
  }
  Object.entries(props).forEach(([key, value]) => {
    if (
      !unCheckKeys.includes(key) && 
      (value === undefined || value === null)
    ) {
      throw new EntityError(`${key} is required`);
    }
  });
}