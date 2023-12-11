import { Id } from "../values/id"
import { Entity } from "./base/entity"
import { EntityCreationError } from "../errors/entity_creation_error";
import { validateProps } from "./utils/validate-props";
import { EntityModificationError } from "../errors/entity_modification_error";

export interface AssignmentProps {
  number: number;
  title: string;
  categoryId: Id;
  introduction: string;
  content: string;
}
/**
 * **sample code**
 * ```typescript
 * const props = AssignmentProps {
 *  number: 1,
 *  title: 'Sample Assignment',
 *  categoryId: categoryId,
 *  introduction: 'This is a sample assignment',
 *  content: 'The content of the sample assignment goes here',
 * }
 * const assignment = Assignment.create(props);
 * ```
 */
export class Assignment extends Entity<AssignmentProps> {

  private constructor(id: Id, props: AssignmentProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: AssignmentProps): Assignment | EntityCreationError {
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

  public changeNumber(newNumber: number): void | EntityModificationError {
    if (!newNumber) {
      throw new EntityModificationError('Number is required')
    }
    this.props.number = newNumber;
  }

  public changeTitle(newTitle: string): void | EntityModificationError {
    if (!newTitle || newTitle.trim() === '') {
      throw new EntityModificationError('Title is required')
    }
    this.props.title = newTitle;
  }

  public changeCategory(newCategoryId: Id): void | EntityModificationError {
    if (!newCategoryId) {
      throw new EntityModificationError('Category is required')
    }
    this.props.categoryId = newCategoryId;
  }

  public changeIntroduction(newIntroduction: string): void | EntityModificationError {
    if (!newIntroduction || newIntroduction.trim() === '') {
      throw new EntityModificationError('Introduction is required')
    }
    this.props.introduction = newIntroduction;
  }

  public changeContent(newContent: string): void | EntityModificationError {
    if (!newContent || newContent.trim() === '') {
      throw new EntityModificationError('Content is required')
    }
    this.props.content = newContent;
  }
}
