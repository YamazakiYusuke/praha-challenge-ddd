import { GetAdministratorByEmailQuery } from 'src/domain/commands/administrator/get-administrator-by-email-query';
import { SaveAdministratorCommand } from 'src/domain/commands/administrator/save-administrator-command';
import { Administrator } from 'src/domain/entities/administrator';
import { EntityError } from 'src/domain/errors/entity_error';
import { ChangeAdministratorEmailService } from 'src/domain/services/administrator/change-administrator-email-service';
import { Email } from 'src/domain/values/email';
import { AdministratorId } from 'src/domain/values/ids';
import { anything, instance, mock, verify, when } from 'ts-mockito';


describe('# ChangeAdministratorEmailService UnitTest\n', () => {
  let getAdministratorByEmailQuery: GetAdministratorByEmailQuery;
  let saveAdministratorCommand: SaveAdministratorCommand;
  let changeAdministratorEmailService: ChangeAdministratorEmailService;
  const id = AdministratorId.restore('Id');
  const email = Email.restore('test@example.com');
  const administrator = Administrator.restore(id, { email });
  const newEmail = Email.restore('newtest@example.com');

  beforeEach(() => {
    getAdministratorByEmailQuery = mock(GetAdministratorByEmailQuery);
    saveAdministratorCommand = mock(SaveAdministratorCommand);
    changeAdministratorEmailService = new ChangeAdministratorEmailService(instance(getAdministratorByEmailQuery), instance(saveAdministratorCommand));
  });

  describe('## execute\n', () => {
    test('- should change email of administrator\n', async () => {
      // 準備
      when(getAdministratorByEmailQuery.execute(newEmail)).thenResolve(null);
      when(saveAdministratorCommand.execute(anything())).thenResolve();
      // 実行
      await changeAdministratorEmailService.execute(administrator, newEmail);
      // 確認
      verify(getAdministratorByEmailQuery.execute(newEmail)).once();
      expect(administrator.email).toEqual(newEmail);
    });

    test('should throw error if email already exists\n', async () => {
      // 準備
      when(getAdministratorByEmailQuery.execute(newEmail)).thenResolve(administrator);
      // 実行・確認
      await expect(changeAdministratorEmailService.execute(administrator, newEmail)).rejects.toThrow(EntityError);
      verify(getAdministratorByEmailQuery.execute(newEmail)).once();
    });

    test('should throw error if failed to save data \n', async () => {
      // 準備
      when(getAdministratorByEmailQuery.execute(newEmail)).thenResolve(null);
      when(saveAdministratorCommand.execute(anything())).thenThrow(Error());
      // 実行・確認
      await expect(changeAdministratorEmailService.execute(administrator, newEmail)).rejects.toThrow(Error);
      verify(getAdministratorByEmailQuery.execute(newEmail)).once();
      verify(saveAdministratorCommand.execute(anything())).once();
    });
  });
});