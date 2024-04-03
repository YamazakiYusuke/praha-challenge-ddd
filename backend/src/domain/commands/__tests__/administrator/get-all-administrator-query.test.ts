
import { GetAllAdministratorsQuery } from 'src/domain/commands/administrator/get-all-administrator-query';
import { Administrator } from 'src/domain/entities/administrator';
import { IAdministratorRepository } from 'src/domain/repositories/administrator-repository';
import { Email } from 'src/domain/values/email';
import { AdministratorId } from 'src/domain/values/id';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetAllAdministratorsQuery UnitTest \n', () => {
  let query: GetAllAdministratorsQuery;
  let administratorRepository: IAdministratorRepository;

  beforeEach(() => {
    administratorRepository = mock<IAdministratorRepository>();
    query = new GetAllAdministratorsQuery(instance(administratorRepository));
  });

  it('- should get all administrators \n', async () => {
    // 準備
    const administratorId1 = AdministratorId.create();
    const administratorId2 = AdministratorId.create();
    const email1 = Email.create('test1@example.com');
    const email2 = Email.create('test2@example.com');
    const administrator1 = Administrator.restore(administratorId1, { email: email1 });
    const administrator2 = Administrator.restore(administratorId2, { email: email2 });
    const administrators: Administrator[] = [administrator1, administrator2];

    when(administratorRepository.getAll()).thenResolve(administrators);

    // 実行
    const result = await query.execute();

    // 確認
    expect(result).toEqual(administrators);
    verify(administratorRepository.getAll()).once();
  });
});
