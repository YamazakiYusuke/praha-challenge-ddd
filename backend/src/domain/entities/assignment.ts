import { Category } from "../values/category"
import { Id } from "../values/id"
import { Entity } from "./entity"

export interface AssignmentProps {
  number: number;
  title: string;
  category: Category;
  introduction: string;
  content: string;
}
/**
 * **sample code**
 * ```typescript
 * const props = AssignmentProps {
 *  number: 1,
 *  title: 'Sample Assignment',
 *  category: Category.create('Sample Category'),
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

  static create(props: AssignmentProps): Assignment | Error {
    const { number, category, title, introduction, content } = props
    if (!number) {
      throw new Error('Number is required')
    }
    if (!title || title.trim() === '') {
      throw new Error('Title is required')
    }
    if (!category) {
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

  public get category(): Category {
    return this.props.category;
  }

  public get introduction(): string {
    return this.props.introduction;
  }

  public get content(): string {
    return this.props.content;
  }
}
