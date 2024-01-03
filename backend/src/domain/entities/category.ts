import { CategoryName } from "src/domain/values/category-name";
import { Id } from "../values/id";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";
import { EntityError } from "src/domain/errors/entity_error";

export interface CategoryProps {
  name: CategoryName;
}

export class Category extends Entity<CategoryProps> {
  private constructor(id: Id, props: CategoryProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: CategoryProps): Category | Error {
    return new Category(Id.create(), props);
  }

  static restore(id: Id, props: CategoryProps): Category {
    return new Category(id, props);
  }

  public get name(): CategoryName {
    return this.props.name
  }

  public changeName(newName: CategoryName): void {
    if (!newName) {
      throw new EntityError(`CategoryName is required`);
    }
    this.props.name = newName
  }
}

