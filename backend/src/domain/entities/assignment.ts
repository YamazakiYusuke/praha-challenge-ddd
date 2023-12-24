import { EntityError } from "../errors/entity_error";
import { Id } from "../values/id"
import { Entity } from "./base/entity"
import { validateProps } from "./utils/validate-props";

export interface AssignmentProps {
  number: number;
  title: string;
  categoryId: Id;
  introduction: string;
  content: string;
}

export class Assignment extends Entity<AssignmentProps> {

  private constructor(id: Id, props: AssignmentProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: AssignmentProps): Assignment | Error {
    return new Assignment(Id.create(), props)
  }

  static restore(id: Id, props: AssignmentProps): Assignment {
    return new Assignment(id, props)
  }

  public get number(): number {
    return this.props.number;
  }

  public get title(): string {
    return this.props.title;
  }

  public get category(): Id {
    return this.props.categoryId;
  }

  public get introduction(): string {
    return this.props.introduction;
  }

  public get content(): string {
    return this.props.content;
  }

  public changeNumber(newNumber: number): void | Error {
    if (!newNumber) {
      throw new EntityError('Number is required')
    }
    this.props.number = newNumber;
  }

  public changeTitle(newTitle: string): void | Error {
    if (!newTitle || newTitle.trim() === '') {
      throw new EntityError('Title is required')
    }
    this.props.title = newTitle;
  }

  public changeCategory(newCategoryId: Id): void | Error {
    if (!newCategoryId) {
      throw new EntityError('Category is required')
    }
    this.props.categoryId = newCategoryId;
  }

  public changeIntroduction(newIntroduction: string): void | Error {
    if (!newIntroduction || newIntroduction.trim() === '') {
      throw new EntityError('Introduction is required')
    }
    this.props.introduction = newIntroduction;
  }

  public changeContent(newContent: string): void | Error {
    if (!newContent || newContent.trim() === '') {
      throw new EntityError('Content is required')
    }
    this.props.content = newContent;
  }
}
