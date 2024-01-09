import { EntityError } from "src/domain/errors/entity_error";
import { AssignmentId, CategoryId, Id } from "src/domain/values/id";
import { Assignment, AssignmentProps } from "../assignment";

describe('# Assignment Entity UnitTest\n', () => {

  describe('## create\n', () => {
    test('- Success create instance \n', () => {
      // 準備・実行
      const number = 1;
      const title = "Test Assignment";
      const categoryId = CategoryId.create();
      const introduction = "This is a test assignment";
      const content = "The content of the test assignment";
      const props: AssignmentProps = { number, title, categoryId, introduction, content };
      const assignment = Assignment.create(props) as Assignment;
      // 確認
      expect(assignment).toBeInstanceOf(Assignment);
      expect(assignment.number).toEqual(number);
      expect(assignment.title).toEqual(title);
      expect(assignment.category).toEqual(categoryId);
      expect(assignment.introduction).toEqual(introduction);
      expect(assignment.content).toEqual(content);
    });
  });

  describe('## restore\n', () => {
    test('- Success restore instance \n', () => {
      // 準備・実行
      const id = AssignmentId.create();
      const number = 1;
      const title = "Test Assignment";
      const categoryId = CategoryId.create();
      const introduction = "This is a test assignment";
      const content = "The content of the test assignment";
      const props: AssignmentProps = { number, title, categoryId, introduction, content };
      const assignment = Assignment.restore(id, props);
      // 確認
      expect(assignment).toBeInstanceOf(Assignment);
      expect(assignment.number).toEqual(number);
      expect(assignment.title).toEqual(title);
      expect(assignment.category).toEqual(categoryId);
      expect(assignment.introduction).toEqual(introduction);
      expect(assignment.content).toEqual(content);
    });
  });

  function getAssignment(): Assignment {
    const id = AssignmentId.create();
    const number = 1;
    const title = "Test Assignment";
    const categoryId = CategoryId.create();
    const introduction = "This is a test assignment";
    const content = "The content of the test assignment";
    const props: AssignmentProps = { number, title, categoryId, introduction, content };
    return Assignment.restore(id, props);
  }

  describe('## changeNumber\n', () => {
    test('- Success to change value \n', () => {
      // 確認
      const assignment = getAssignment();
      const newNumber = 2;
      // 実行
      assignment.changeNumber(newNumber);
      // 確認
      expect(assignment.number).toEqual(newNumber);
    });

    test('- Failed to change value \n', () => {
      // 準備
      const assignment = getAssignment();
      const newNumber = null as unknown as number;
      // 実行・確認
      expect(() => assignment.changeNumber(newNumber)).toThrow(EntityError);
    });
  });

  describe('## changeTitle\n', () => {
    test('- Success to change value \n', () => {
      // 準備
      const assignment = getAssignment();
      const newTitle = "New Test Assignment";
      // 実行
      assignment.changeTitle(newTitle);
      // 確認
      expect(assignment.title).toEqual(newTitle);
    });

    test('- Failed to change value \n', () => {
      // 準備
      const assignment = getAssignment();
      const newTitle = null as unknown as string;
      // 実行・確認
      expect(() => assignment.changeTitle(newTitle)).toThrow(EntityError);
    });
  });

  describe('## changeCategory\n', () => {
    test('- Success to change value \n', () => {
      // 準備
      const assignment = getAssignment();
      const newCategoryId = CategoryId.create();
      // 実行
      assignment.changeCategory(newCategoryId);
      // 確認
      expect(assignment.category).toEqual(newCategoryId);
    });

    test('- Failed to change value \n', () => {
      // 準備
      const assignment = getAssignment();
      const newCategoryId = null as unknown as CategoryId;
      // 実行・確認
      expect(() => assignment.changeCategory(newCategoryId)).toThrow(EntityError);
    });
  });

  describe('## changeIntroduction\n', () => {
    test('- Success to change value \n', () => {
      // 
      const assignment = getAssignment();
      const newIntroduction = "This is a new test assignment";
      // 実行
      assignment.changeIntroduction(newIntroduction);
      // 確認
      expect(assignment.introduction).toEqual(newIntroduction);
    });

    test('- Failed to change value \n', () => {
      // 準備
      const assignment = getAssignment();
      const newIntroduction = null as unknown as string;
      // 実行・確認
      expect(() => assignment.changeIntroduction(newIntroduction)).toThrow(EntityError);
    });
  });

  describe('## changeContent\n', () => {
    test('- Success to change value \n', () => {
      // 準備
      const assignment = getAssignment();
      const newContent = "The new content of the test assignment";
      // 実行
      assignment.changeContent(newContent);
      // 確認
      expect(assignment.content).toEqual(newContent);
    });

    test('- Failed to change value \n', () => {
      // 準備
      const assignment = getAssignment();
      const newContent = null as unknown as string;
      // 実行・確認
      expect(() => assignment.changeContent(newContent)).toThrow(EntityError);
    });
  });
});

