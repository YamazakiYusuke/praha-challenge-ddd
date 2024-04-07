import { EntityError } from "src/domain/errors/entity_error";
import { CategoryName } from "src/domain/values/name";
import { CategoryId } from "../values/ids";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface CategoryProps {
  readonly name: CategoryName;
}

export class Category extends Entity<CategoryId, CategoryProps> {
  private constructor(id: CategoryId, props: CategoryProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: CategoryProps): Category {
    return new Category(CategoryId.create(), props);
  }

  static restore(id: CategoryId, props: CategoryProps): Category {
    return new Category(id, props);
  }

  public get name(): CategoryName {
    return this.props.name
  }

  public changeName(newName: CategoryName): void {
    if (!newName) {
      throw new EntityError(`CategoryName is required`);
    }
    const newProps = { ...this.props, name: newName };
    this.setProps(newProps);
  }
}

