import { GetCategoryByNameQuery } from 'src/domain/commands/category/get-one-category-by-name-query';
import { SaveCategoryCommand } from 'src/domain/commands/category/save-category-command';
import { Category, CategoryProps } from 'src/domain/entities/category';
import { EntityError } from 'src/domain/errors/entity_error';
import { ChangeCategoryNameService } from 'src/domain/services/category/change-category-name-service';
import { CategoryId } from 'src/domain/values/ids';
import { CategoryName } from 'src/domain/values/name';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# ChangeCategoryNameService UnitTest\n', () => {
  let getCategoryByNameQuery: GetCategoryByNameQuery;
  let saveCategoryCommand: SaveCategoryCommand;
  let changeCategoryNameService: ChangeCategoryNameService;
  const id = CategoryId.restore('Id');
  const name = CategoryName.restore('test');
  const props: CategoryProps = { name };
  const category = Category.restore(id, props);
  const newName = CategoryName.restore('newTest');

  beforeEach(() => {
    getCategoryByNameQuery = mock(GetCategoryByNameQuery);
    saveCategoryCommand = mock(SaveCategoryCommand);
    changeCategoryNameService = new ChangeCategoryNameService(instance(getCategoryByNameQuery), instance(saveCategoryCommand));
  });

  describe('## execute\n', () => {
    test('- should change name of category\n', async () => {
      // 準備
      when(getCategoryByNameQuery.execute(newName)).thenResolve(null);
      // 実行
      await changeCategoryNameService.execute(category, newName);
      // 確認
      verify(getCategoryByNameQuery.execute(newName)).once();
      expect(category.name).toEqual(newName);
    });

    test('should throw error if name already exists\n', async () => {
      // 準備
      when(getCategoryByNameQuery.execute(newName)).thenResolve(category);
      // 実行・確認
      await expect(changeCategoryNameService.execute(category, newName)).rejects.toThrow(EntityError);
      verify(getCategoryByNameQuery.execute(newName)).once();
    });

    test('should throw error if fail to save \n', async () => {
      // 準備
      when(getCategoryByNameQuery.execute(newName)).thenResolve(null);
      when(saveCategoryCommand.execute(anything())).thenThrow(Error());
      // 実行・確認
      await expect(changeCategoryNameService.execute(category, newName)).rejects.toThrow(Error);
      verify(getCategoryByNameQuery.execute(newName)).once();
      verify(saveCategoryCommand.execute(anything())).once();
    });
  });
});
