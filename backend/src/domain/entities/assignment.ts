import { Category } from "./category"
import { Id } from "../values/id"
import { Entity } from "./entity"

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
    super(id, props)
  }

  static create(props: AssignmentProps): Assignment | EntityCreationError {
    const { number, categoryId, title, introduction, content } = props
    if (!number) {
      throw new Error('Number is required')
    }
    if (!title || title.trim() === '') {
      throw new Error('Title is required')
    }
    if (!categoryId) {
      throw new Error('Category is required')
    }
    if (!introduction || introduction.trim() === '') {
      throw new Error('Introduction is required')
    }
    if (!content || content.trim() === '') {
      throw new Error('Content is required')
    }
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
      throw new Error('Number is required')
    }
    this.props.number = newNumber;
  }

  public changeTitle(newTitle: string): void | Error {
    if (!newTitle || newTitle.trim() === '') {
      throw new Error('Title is required')
    }
    this.props.title = newTitle;
  }

  public changeCategory(newCategoryId: Id): void | Error {
    if (!newCategoryId) {
      throw new Error('Category is required')
    }
    this.props.categoryId = newCategoryId;
  }

  public changeIntroduction(newIntroduction: string): void | Error {
    if (!newIntroduction || newIntroduction.trim() === '') {
      throw new Error('Introduction is required')
    }
    this.props.introduction = newIntroduction;
  }

  public changeContent(newContent: string): void | Error {
    if (!newContent || newContent.trim() === '') {
      throw new Error('Content is required')
    }
    this.props.content = newContent;
  }
}
