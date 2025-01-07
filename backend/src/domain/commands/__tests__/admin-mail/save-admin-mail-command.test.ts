import { SaveAdminMailCommand } from 'src/domain/commands/admin-mail/save-admin-mail-command';
import { AdminEmail } from 'src/domain/entities/admin-email';
import { IAdminMailRepository } from 'src/domain/repositories/admin-mail-repository';
import { EmailStatus } from 'src/domain/util/enums';
import { AdminEmailContent } from 'src/domain/values/admin-email-content';
import { AdminEmailId } from 'src/domain/values/ids';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# SaveAdminMailCommand UnitTest \n', () => {
  let command: SaveAdminMailCommand;
  let adminMailRepository: IAdminMailRepository;

  beforeEach(() => {
    adminMailRepository = mock<IAdminMailRepository>();
    command = new SaveAdminMailCommand(instance(adminMailRepository));
  });

  it('- should save admin email \n', async () => {
    // 準備
    const adminEmailId = AdminEmailId.create();
    const adminEmailProps = {
      content: AdminEmailContent.restore({
        title: 'Test Title',
        body: 'Test Body',
      }),
      recipients: [],
      status: EmailStatus.Pending,
    };
    const adminEmail = AdminEmail.restore(adminEmailId, adminEmailProps);
    const transaction = {};

    when(adminMailRepository.save(anything(), anything())).thenResolve();

    // 実行
    await command.execute(adminEmail, transaction);

    // 確認
    verify(adminMailRepository.save(adminEmail, transaction)).once();
  });
});


