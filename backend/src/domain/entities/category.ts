import { Id } from "../values/id";
import { Entity } from "./entity";

export interface CategoryProps {
  name: string;
}
/**
 * **sample code**
 * ```typescript
 * const props = CategoryProps {
 *  name: 'Sample Category',
 * }
 * const category = Category.create(props);
 * ```
 */
export class Category extends Entity<CategoryProps> {
  private constructor(id: Id, value: CategoryProps) {
    super(id, value)
  }

  static create(props: CategoryProps): Category | EntityCreationError {
    if (!props.name) {
      return new Error('Name is required');
    }
    return new Category(Id.create(), props);
  }

  static restore(id: Id, props: CategoryProps): Category {
    return new Category(id, props);
  }

  public get name(): string {
    return this.props.name
  }

  public changeName(newName: string): Category | Error {
    if (!newName) {
      throw new Error('Name is required');
    }
    this.props.name = newName
    return this
  }
}

