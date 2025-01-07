import { SaveAdministratorCommand } from 'src/domain/commands/administrator/save-administrator-command';
import { Administrator } from 'src/domain/entities/administrator';
import { IAdministratorRepository } from 'src/domain/repositories/administrator-repository';
import { Email } from 'src/domain/values/email';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# SaveAdministratorCommand UnitTest \n', () => {
  let command: SaveAdministratorCommand;
  let administratorRepository: IAdministratorRepository;

  beforeEach(() => {
    administratorRepository = mock<IAdministratorRepository>();
    command = new SaveAdministratorCommand(instance(administratorRepository));
  });

  it('- should save administrator \n', async () => {
    // 準備
    const administrator = Administrator.create({ email: Email.restore('test@example.com') });
    const transaction = {};

    when(administratorRepository.save(anything(), anything())).thenResolve();

    // 実行
    await command.execute(administrator, transaction);

    // 確認
    verify(administratorRepository.save(administrator, transaction)).once();
  });
});
