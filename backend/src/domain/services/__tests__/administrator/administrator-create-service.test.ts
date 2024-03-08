import { GetAdministratorByEmailQuery } from 'src/domain/commands/administrator/get-administrator-by-email-query';
import { SaveAdministratorCommand } from 'src/domain/commands/administrator/save-administrator-command';
import { Administrator, AdministratorProps } from 'src/domain/entities/administrator';
import { EntityError } from 'src/domain/errors/entity_error';
import { AdministratorCreateService } from 'src/domain/services/administrator/administrator-create-service';
import { Email } from 'src/domain/values/email';
import { AdministratorId } from 'src/domain/values/id';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# AdministratorCreateService UnitTest\n', () => {
  let getAdministratorByEmailQuery: GetAdministratorByEmailQuery;
  let saveAdministratorCommand: SaveAdministratorCommand;
  let administratorCreateService: AdministratorCreateService;
  const id = AdministratorId.restore('Id');
  const email = Email.restore('test@example.com');
  const props: AdministratorProps = { email };
  const administrator = Administrator.restore(id, props);

  beforeEach(() => {
    getAdministratorByEmailQuery = mock(GetAdministratorByEmailQuery);
    saveAdministratorCommand = mock(SaveAdministratorCommand);
    administratorCreateService = new AdministratorCreateService(instance(getAdministratorByEmailQuery), instance(saveAdministratorCommand));
  });

  describe('## execute\n', () => {
    test('- should create a new administrator\n', async () => {
      // 準備
      when(getAdministratorByEmailQuery.execute(email)).thenResolve(null);
      // 実行
      const result = await administratorCreateService.execute(props);
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
      await expect(administratorCreateService.execute(props)).rejects.toThrow(EntityError);
      verify(getAdministratorByEmailQuery.execute(email)).once();
    });

    test('should throw error if fail to save \n', async () => {
      // 準備
      when(getAdministratorByEmailQuery.execute(email)).thenResolve(null);
      when(saveAdministratorCommand.execute(anything())).thenThrow(Error());
      // 実行・確認
      await expect(administratorCreateService.execute(props)).rejects.toThrow(Error);
      verify(getAdministratorByEmailQuery.execute(email)).once();
      verify(saveAdministratorCommand.execute(anything())).once();
    });
  });
});
