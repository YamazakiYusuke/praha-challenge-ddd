import { GetCategoryByNameQuery } from 'src/domain/commands/category/get-one-category-by-name-query';
import { Category, CategoryProps } from 'src/domain/entities/category';
import { EntityError } from 'src/domain/errors/entity_error';
import { CategoryChangeNameService } from 'src/domain/services/category/category-change-name-service';
import { CategoryName } from 'src/domain/values/name';
import { CategoryId } from 'src/domain/values/id';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# CategoryChangeNameService UnitTest\n', () => {
  let getCategoryByNameQuery: GetCategoryByNameQuery;
  let categoryChangeNameService: CategoryChangeNameService;
  const id = CategoryId.restore('Id');
  const name = CategoryName.restore('test');
  const props: CategoryProps = { name };
  const category = Category.restore(id, props);
  const newName = CategoryName.restore('newTest');

  beforeEach(() => {
    getCategoryByNameQuery = mock(GetCategoryByNameQuery);
    categoryChangeNameService = new CategoryChangeNameService(instance(getCategoryByNameQuery));
  });
  
  describe('## execute\n', () => {
    test('- should change name of category\n', async () => {
      // 準備
      when(getCategoryByNameQuery.execute(newName)).thenResolve(null);
      // 実行
      await categoryChangeNameService.execute(category, newName);
      // 確認
      verify(getCategoryByNameQuery.execute(newName)).once();
      expect(category.name).toEqual(newName);
    });

    test('should throw error if name already exists\n', async () => {
      // 準備
      when(getCategoryByNameQuery.execute(newName)).thenResolve(category);
      // 実行・確認
      await expect(categoryChangeNameService.execute(category, newName)).rejects.toThrow(EntityError);
      verify(getCategoryByNameQuery.execute(newName)).once();
    });
  });
});
