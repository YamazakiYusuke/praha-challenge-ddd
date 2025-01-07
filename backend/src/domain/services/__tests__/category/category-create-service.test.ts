import { GetCategoryByNameQuery } from 'src/domain/commands/category/get-one-category-by-name-query';
import { SaveCategoryCommand } from 'src/domain/commands/category/save-category-command';
import { Category, CategoryProps } from 'src/domain/entities/category';
import { DomainServiceError } from 'src/domain/errors/domain_service_error';
import { CreateCategoryService } from 'src/domain/services/category/create-category-service';
import { CategoryId } from 'src/domain/values/ids';
import { CategoryName } from 'src/domain/values/name';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# CreateCategoryService UnitTest\n', () => {
  let getCategoryByNameQuery: GetCategoryByNameQuery;
  let saveCategoryCommand: SaveCategoryCommand;
  let createCategoryService: CreateCategoryService;
  const name = CategoryName.restore('test');
  const props: CategoryProps = { name };

  beforeEach(() => {
    getCategoryByNameQuery = mock(GetCategoryByNameQuery);
    saveCategoryCommand = mock(SaveCategoryCommand);
    createCategoryService = new CreateCategoryService(instance(getCategoryByNameQuery), instance(saveCategoryCommand));
  });

  describe('## execute\n', () => {
    test('- should create a new category\n', async () => {
      // 準備
      when(getCategoryByNameQuery.execute(name)).thenResolve(null);
      // 実行
      const result = await createCategoryService.execute(props);
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
      await expect(createCategoryService.execute(props)).rejects.toThrow(DomainServiceError);
      verify(getCategoryByNameQuery.execute(name)).once();
    });

    test('should throw error if fail to save data \n', async () => {
      // 準備
      when(getCategoryByNameQuery.execute(name)).thenResolve(null);
      when(saveCategoryCommand.execute(anything())).thenThrow(Error());
      // 実行・確認
      await expect(createCategoryService.execute(props)).rejects.toThrow(Error);
      verify(getCategoryByNameQuery.execute(name)).once();
      verify(saveCategoryCommand.execute(anything())).once();
    });
  });
});
