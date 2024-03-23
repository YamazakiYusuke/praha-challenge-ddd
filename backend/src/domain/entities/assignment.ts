import { EntityError } from "../errors/entity_error";
import { AssignmentId, CategoryId } from "../values/id";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface AssignmentProps {
  number: number;
  title: string;
  categoryId: CategoryId;
  introduction: string;
  content: string;
}

export class Assignment extends Entity<AssignmentId, AssignmentProps> {

  private constructor(id: AssignmentId, props: AssignmentProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: AssignmentProps): Assignment {
    if (props.title.trim() === '') {
      throw new EntityError('Title is required')
    }
    if (props.introduction.trim() === '') {
      throw new EntityError('Introduction is required')
    }
    if (props.content.trim() === '') {
      throw new EntityError('Content is required')
    }
    return new Assignment(AssignmentId.create(), props)
  }

  static restore(id: AssignmentId, props: AssignmentProps): Assignment {
    return new Assignment(id, props)
  }

  public get number(): number {
    return this.props.number;
  }

  public get title(): string {
    return this.props.title;
  }

  public get categoryId(): CategoryId {
    return this.props.categoryId;
  }

  public get introduction(): string {
    return this.props.introduction;
  }

  public get content(): string {
    return this.props.content;
  }

  public changeNumber(newNumber: number): void {
    if (!newNumber) {
      throw new EntityError('Number is required')
    }
    this.props.number = newNumber;
  }

  public changeTitle(newTitle: string): void {
    if (!newTitle || newTitle.trim() === '') {
      throw new EntityError('Title is required')
    }
    this.props.title = newTitle;
  }

  public changeCategory(newCategoryId: CategoryId): void {
    if (!newCategoryId) {
      throw new EntityError('Category is required')
    }
    this.props.categoryId = newCategoryId;
  }

  public changeIntroduction(newIntroduction: string): void {
    if (!newIntroduction || newIntroduction.trim() === '') {
      throw new EntityError('Introduction is required')
    }
    this.props.introduction = newIntroduction;
  }

  public changeContent(newContent: string): void {
    if (!newContent || newContent.trim() === '') {
      throw new EntityError('Content is required')
    }
    this.props.content = newContent;
  }
}
