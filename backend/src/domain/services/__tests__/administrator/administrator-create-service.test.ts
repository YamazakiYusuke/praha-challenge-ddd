import { GetAdministratorByEmailQuery } from 'src/domain/commands/administrator/get-administrator-by-email-query';
import { SaveAdministratorCommand } from 'src/domain/commands/administrator/save-administrator-command';
import { Administrator, AdministratorProps } from 'src/domain/entities/administrator';
import { DomainServiceError } from 'src/domain/errors/domain_service_error';
import { CreateAdministratorService } from 'src/domain/services/administrator/create-administrator-service';
import { Email } from 'src/domain/values/email';
import { AdministratorId } from 'src/domain/values/ids';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# CreateAdministratorService UnitTest\n', () => {
  let getAdministratorByEmailQuery: GetAdministratorByEmailQuery;
  let saveAdministratorCommand: SaveAdministratorCommand;
  let createAdministratorService: CreateAdministratorService;
  const id = AdministratorId.restore('Id');
  const email = Email.restore('test@example.com');
  const props: AdministratorProps = { email };
  const administrator = Administrator.restore(id, props);

  beforeEach(() => {
    getAdministratorByEmailQuery = mock(GetAdministratorByEmailQuery);
    saveAdministratorCommand = mock(SaveAdministratorCommand);
    createAdministratorService = new CreateAdministratorService(instance(getAdministratorByEmailQuery), instance(saveAdministratorCommand));
  });

  describe('## execute\n', () => {
    test('- should create a new administrator\n', async () => {
      // 準備
      when(getAdministratorByEmailQuery.execute(email)).thenResolve(null);
      // 実行
      const result = await createAdministratorService.execute(props);
      // 確認
      verify(getAdministratorByEmailQuery.execute(email)).once();
      expect(result).toEqual(expect.objectContaining({
        props: expect.objectContaining({
          email: expect.objectContaining({
            props: 'test@example.com'
          })
        })
      }));
    });

    test('should throw error if email already exists\n', async () => {
      // 準備
      when(getAdministratorByEmailQuery.execute(email)).thenResolve(administrator);
      // 実行・確認
      await expect(createAdministratorService.execute(props)).rejects.toThrow(DomainServiceError);
      verify(getAdministratorByEmailQuery.execute(email)).once();
    });

    test('should throw error if fail to save \n', async () => {
      // 準備
      when(getAdministratorByEmailQuery.execute(email)).thenResolve(null);
      when(saveAdministratorCommand.execute(anything())).thenThrow(Error());
      // 実行・確認
      await expect(createAdministratorService.execute(props)).rejects.toThrow(Error);
      verify(getAdministratorByEmailQuery.execute(email)).once();
      verify(saveAdministratorCommand.execute(anything())).once();
    });
  });
});
