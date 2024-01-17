import { GetCategoryByNameQuery } from 'src/domain/commands/category/get-one-category-by-name-query';
import { Category, CategoryProps } from 'src/domain/entities/category';
import { EntityError } from 'src/domain/errors/entity_error';
import { CategoryCreateService } from 'src/domain/services/category/category-create-service';
import { CategoryId } from 'src/domain/values/id';
import { CategoryName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# CategoryCreateService UnitTest\n', () => {
  let getCategoryByNameQuery: GetCategoryByNameQuery;
  let categoryCreateService: CategoryCreateService;
  const name = CategoryName.restore('test');
  const props: CategoryProps = { name };

  beforeEach(() => {
    getCategoryByNameQuery = mock(GetCategoryByNameQuery);
    categoryCreateService = new CategoryCreateService(instance(getCategoryByNameQuery));
  });
  
  describe('## execute\n', () => {
    test('- should create a new category\n', async () => {
      // 準備
      when(getCategoryByNameQuery.execute(name)).thenResolve(null);
      // 実行
      const result = await categoryCreateService.execute(props);
      // 確認
      verify(getCategoryByNameQuery.execute(name)).once();
      expect(result).toEqual(expect.objectContaining({
        props: expect.objectContaining({
          name: expect.objectContaining({
            props: 'test'
          })
        })
      }));
    });

    test('should throw error if name already exists\n', async () => {
      // 準備
      when(getCategoryByNameQuery.execute(name)).thenResolve(Category.restore(CategoryId.restore('Id'), props));
      // 実行・確認
      await expect(categoryCreateService.execute(props)).rejects.toThrow(EntityError);
      verify(getCategoryByNameQuery.execute(name)).once();
    });
  });
});
