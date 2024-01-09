import { EntityError } from "src/domain/errors/entity_error";
import { CategoryId } from "src/domain/values/id";
import { CategoryName } from "src/domain/values/name";
import { Category, CategoryProps } from "../category";

describe('# Category Entity UnitTest\n', () => {
  describe('## create\n', () => {
    test('- Success create instance \n', () => {
      // 準備
      const name = CategoryName.create('Test Category') as CategoryName;
      const props: CategoryProps = { name };
      // 実行
      const category = Category.create(props) as Category;
      // 確認
      expect(category).toBeInstanceOf(Category);
      expect(category.name).toEqual(name);
    });
  });

  describe('## restore\n', () => {
    test('- Success create instance \n', () => {
      // 準備
      const id = CategoryId.create();
      const name = CategoryName.create('Test Category') as CategoryName;
      const props: CategoryProps = { name };
      // 実行
      const category = Category.restore(id, props);
      // 確認
      expect(category).toBeInstanceOf(Category);
      expect(category.getId).toEqual(id);
      expect(category.name).toEqual(name);
    });
  });

  describe('## name\n', () => {
    test('- Success to get instance \n', () => {
      // 準備
      const name = CategoryName.create('Test Category') as CategoryName;
      const props: CategoryProps = { name };
      // 実行
      const category = Category.create(props) as Category;
      // 確認
      expect(category.name).toEqual(name);
    });
  });

  describe('## changeName\n', () => {
    test('- Success to change value \n', () => {
      // 準備
      const name = CategoryName.create('Test Category') as CategoryName;
      const newName = CategoryName.create('New Test Category') as CategoryName;
      const props: CategoryProps = { name };
      const category = Category.create(props) as Category;
      // 実行
      category.changeName(newName);
      // 確認
      expect(category.name).toEqual(newName);
    });

    test('- Failed to change value \n', () => {
      // 準備
      const name = CategoryName.create('Test Category') as CategoryName;
      const newName = null as unknown as CategoryName;
      const props: CategoryProps = { name };
      const category = Category.create(props) as Category;
      // 実行・確認
      expect(() => category.changeName(newName)).toThrow(EntityError);
    });
  });
});

