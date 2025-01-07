import { SaveCategoryCommand } from 'src/domain/commands/category/save-category-command';
import { Category } from 'src/domain/entities/category';
import { ICategoryRepository } from 'src/domain/repositories/category-repository';
import { CategoryName } from 'src/domain/values/name';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# SaveCategoryCommand UnitTest \n', () => {
  let command: SaveCategoryCommand;
  let categoryRepository: ICategoryRepository;

  beforeEach(() => {
    categoryRepository = mock<ICategoryRepository>();
    command = new SaveCategoryCommand(instance(categoryRepository));
  });

  it('- should save category \n', async () => {
    // 準備
    const categoryName = CategoryName.create('Test Category');
    const category = Category.create({ name: categoryName });
    const transaction = {};

    when(categoryRepository.save(anything(), anything())).thenResolve();

    // 実行
    await command.execute(category, transaction);

    // 確認
    verify(categoryRepository.save(category, transaction)).once();
  });
});
