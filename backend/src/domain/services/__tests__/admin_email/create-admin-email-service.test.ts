import { GetAllAdministratorsQuery } from 'src/domain/commands/administrator/get-all-administrator-query';
import { CreateAdminEmailService } from 'src/domain/services/admin_email/create-admin-email-service';
import { EmailStatus } from 'src/domain/util/enums';
import { AdminEmailContent } from 'src/domain/values/admin-email-content';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# CreateAdminEmailService UnitTest\n', () => {
  let getAllAdministratorsQuery: GetAllAdministratorsQuery;
  let createAdminEmailService: CreateAdminEmailService;
  const content = AdminEmailContent.restore({
    title: 'title',
    body: 'body',
  });

  beforeEach(() => {
    getAllAdministratorsQuery = mock(GetAllAdministratorsQuery);
    createAdminEmailService = new CreateAdminEmailService(instance(getAllAdministratorsQuery));
  });

  describe('## execute\n', () => {
    test('- should create a new admin email\n', async () => {
      // 準備
      when(getAllAdministratorsQuery.execute()).thenResolve([]);
      // 実行
      const result = await createAdminEmailService.execute(content);
      // 確認
      verify(getAllAdministratorsQuery.execute()).once();
      expect(result).toEqual(expect.objectContaining({
        props: expect.objectContaining({
          content: expect.objectContaining({
            _props: expect.objectContaining({
              body: 'body',
              title: 'title'
            })
          }),
          status: EmailStatus.Pending
        })
      }));
    });

    test('- should handle no administrators\n', async () => {
      // 準備
      when(getAllAdministratorsQuery.execute()).thenResolve([]);
      // 実行
      const result = await createAdminEmailService.execute(content);
      // 確認
      expect(result.recipients).toHaveLength(0);
    });
  });
});
