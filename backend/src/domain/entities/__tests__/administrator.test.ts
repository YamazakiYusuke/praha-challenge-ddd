import { EntityError } from "src/domain/errors/entity_error";
import { Email } from "src/domain/values/email";
import { AdministratorId } from "src/domain/values/ids";
import { Administrator, AdministratorProps } from "../administrator";

describe('# Administrator Entity UnitTest\n', () => {
  describe('## create\n', () => {
    test('- Success create instance \n', () => {
      // 準備
      const email = Email.restore('test@example.com');
      const props: AdministratorProps = { email };
      // 実行
      const admin = Administrator.create(props);
      // 確認
      expect(admin).toBeInstanceOf(Administrator);
      expect(admin.email).toEqual(email);
    });
  });

  describe('## restore\n', () => {
    test('- Success create instance \n', () => {
      // 準備
      const id = AdministratorId.restore('Id');
      const email = Email.restore('test@example.com');
      const props: AdministratorProps = { email };
      // 実行
      const admin = Administrator.restore(id, props);
      // 確認
      expect(admin).toBeInstanceOf(Administrator);
      expect(admin.id).toEqual(id);
      expect(admin.email).toEqual(email);
    });
  });

  function getAdmin(): Administrator {
    const id = AdministratorId.restore('Id');
    const email = Email.restore('test@example.com');
    const props: AdministratorProps = { email };
    return Administrator.restore(id, props);
  }

  describe('## changeEmail\n', () => {
    test('- Success to change value \n', () => {
      // 準備
      const admin = getAdmin();
      const newEmail = Email.restore('newtest@example.com');
      // 実行
      admin.changeEmail(newEmail);
      // 確認
      expect(admin.email).toEqual(newEmail);
    });

    test('- Failed to change value \n', () => {
      // 準備
      const admin = getAdmin();
      const newEmail = null as unknown as Email;
      // 実行・確認
      expect(() => admin.changeEmail(newEmail)).toThrow(EntityError);
    });
  });
});
