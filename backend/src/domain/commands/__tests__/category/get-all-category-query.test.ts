import { GetAllCategoryQuery } from 'src/domain/commands/category/get-all-category-query';
import { Category } from 'src/domain/entities/category';
import { ICategoryRepository } from 'src/domain/repositories/category-repository';
import { CategoryName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetAllCategoryQuery UnitTest \n', () => {
  let query: GetAllCategoryQuery;
  let categoryRepository: ICategoryRepository;

  beforeEach(() => {
    categoryRepository = mock<ICategoryRepository>();
    query = new GetAllCategoryQuery(instance(categoryRepository));
  });

  it('- should get all categories \n', async () => {
    // 準備
    const category1 = Category.create({ name: CategoryName.create('Category 1') });
    const category2 = Category.create({ name: CategoryName.create('Category 2') });
    const categories: Category[] = [category1, category2];

    when(categoryRepository.getAll()).thenResolve(categories);

    // 実行
    const result = await query.execute();

    // 確認
    expect(result).toEqual(categories);
    verify(categoryRepository.getAll()).once();
  });
});
