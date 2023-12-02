import { Category } from "./category"
import { Value } from "./value"

/**
 * **sample code**
 * ```typescript
 * const props = {
 *  number: 1,
 *  title: 'Sample Assignment',
 *  category: Category.create('Sample Category'),
 *  introduction: 'This is a sample assignment',
 *  content: 'The content of the sample assignment goes here',
 * }
 * const assignment = Assignment.create(props);
 * ```
 */
export class Assignment extends Value {
  readonly number: number
  readonly category: Category
  readonly title: string
  readonly introduction: string
  readonly content: string

  private constructor(props: { number: number; title: string; category: Category; introduction: string; content: string }) {
    super()
    const { number, category, title, introduction, content } = props
    this.number = number;
    this.category = category
    this.title = title
    this.introduction = introduction
    this.content = content
  }

  static create(props: { number: number; title: string; category: Category; introduction: string; content: string }) {
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
    return new Assignment(props)
  }

  static restore(props: { number: number; title: string; category: Category; introduction: string; content: string }) {
    return new Assignment(props)
  }

  public isEqual(other: any): boolean {
    if (!(other instanceof Assignment)) return false
    return this.number === other.number &&
      this.category.isEqual(other.category) &&
      this.title === other.title &&
      this.introduction === other.introduction &&
      this.content === other.content;
  }
}
