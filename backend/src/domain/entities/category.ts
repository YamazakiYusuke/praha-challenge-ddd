import { EntityCreationError } from "../errors/entity_creation_error";
import { Id } from "../values/id";
import { Name } from "../values/name";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface CategoryProps {
  name: Name;
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
  private constructor(id: Id, props: CategoryProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: CategoryProps): Category | EntityCreationError {
    return new Category(Id.create(), props);
  }

  static restore(id: Id, props: CategoryProps): Category {
    return new Category(id, props);
  }

  public get name(): Name {
    return this.props.name
  }

  public changeName(newName: Name): Category {
    this.props.name = newName
    return this
  }
}

