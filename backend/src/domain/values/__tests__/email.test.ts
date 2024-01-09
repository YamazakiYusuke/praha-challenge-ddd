import { Email } from "src/domain/values/email";
import { ValueError } from "src/domain/errors/value_error";

describe('# Email Value UnitTest \n', () => {
  describe('## create \n', () => {
    it('- Success create instance \n', () => {
      // 準備
      const email = Email.create('test@example.com') as Email;
      // 実行・確認
      expect(email).toBeInstanceOf(Email);
      expect(email.value).toEqual('test@example.com');
    });

    it('- Failed create instance \n', () => {
      // 準備
      const invalidEmail = 'invalidEmail';
      // 実行・確認
      expect(() => Email.create(invalidEmail)).toThrow(ValueError);
    });
  });

  describe('## restore \n', () => {
    it('- Success restore instance \n', () => {
      // 準備
      const email = Email.restore('test@example.com');
      // 実行・確認
      expect(email).toBeInstanceOf(Email);
      expect(email.value).toEqual('test@example.com');
    });
  });
});
