import { GetCategoryByNameQuery } from 'src/domain/commands/category/get-one-category-by-name-query';
import { Category } from 'src/domain/entities/category';
import { ICategoryRepository } from 'src/domain/repositories/category-repository';
import { CategoryName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetCategoryByNameQuery UnitTest \n', () => {
  let query: GetCategoryByNameQuery;
  let categoryRepository: ICategoryRepository;

  beforeEach(() => {
    categoryRepository = mock<ICategoryRepository>();
    query = new GetCategoryByNameQuery(instance(categoryRepository));
  });

  it('- should get category by name \n', async () => {
    // 準備
    const categoryName = CategoryName.create('Test Category');
    const category = Category.create({ name: categoryName });

    when(categoryRepository.getAll()).thenResolve([category]);

    // 実行
    const result = await query.execute(categoryName);

    // 確認
    expect(result).toEqual(category);
    verify(categoryRepository.getAll()).once();
  });
});
