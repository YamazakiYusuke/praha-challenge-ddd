
import { GetAdministratorByEmailQuery } from 'src/domain/commands/administrator/get-administrator-by-email-query';
import { Administrator } from 'src/domain/entities/administrator';
import { IAdministratorRepository } from 'src/domain/repositories/administrator-repository';
import { Email } from 'src/domain/values/email';
import { AdministratorId } from 'src/domain/values/id';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetAdministratorByEmailQuery UnitTest \n', () => {
  let query: GetAdministratorByEmailQuery;
  let administratorRepository: IAdministratorRepository;

  beforeEach(async () => {
    administratorRepository = mock<IAdministratorRepository>();
    query = new GetAdministratorByEmailQuery(instance(administratorRepository));
  });

  it('- should return an administrator by email \n', async () => {
    // 準備
    const email = Email.create('test@example.com');
    const administratorId = AdministratorId.create();
    const administratorProps = { email: email };
    const expectedAdministrator = Administrator.restore(administratorId, administratorProps);
    when(administratorRepository.getAll()).thenResolve([expectedAdministrator]);

    // 実行
    const result = await query.execute(email);

    // 確認
    expect(result).toEqual(expectedAdministrator);
    verify(administratorRepository.getAll()).once();
  });

  it('- should return null if no administrator is found \n', async () => {
    // 準備
    const email = Email.create('notfound@example.com');
    when(administratorRepository.getAll()).thenResolve([]);

    // 実行
    const result = await query.execute(email);

    // 確認
    expect(result).toBeNull();
    verify(administratorRepository.getAll()).once();
  });
});

