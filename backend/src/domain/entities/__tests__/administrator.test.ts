import { EntityError } from "src/domain/errors/entity_error";
import { Administrator, AdministratorProps } from "../administrator";
import { Email } from "src/domain/values/email";
import { Id } from "src/domain/values/id";

describe('# Administrator Entity UnitTest\n', () => {
  describe('## create\n', () => {
    test('- Success create instance \n', () =>{
      // 準備
      const email = Email.create('test@example.com') as Email;
      const props: AdministratorProps = { email };
      // 実行
      const admin = Administrator.create(props);
      // 確認
      expect(admin).toBeInstanceOf(Administrator);
    }); 
  });

  describe('## restore\n', () => {
    test('- Success create instance \n', () =>{
      // 準備
      const id = Id.create();
      const email = Email.create('test@example.com') as Email;
      const props: AdministratorProps = { email };
      // 実行
      const admin = Administrator.restore(id, props);
      // 確認
      expect(admin).toBeInstanceOf(Administrator);
    }); 
  });

  describe('## email\n', () => {
    test('- Success to get instance \n', () =>{
      // 準備
      const email = Email.create('test@example.com') as Email;
      const props: AdministratorProps = { email };
      // 実行
      const admin = Administrator.create(props) as Administrator;
      // 確認
      expect(admin.email).toEqual(email);
    }); 
  });

  describe('## changeEmail\n', () => {
    test('- Success to change value \n', () =>{
      // 準備
      const email = Email.create('test@example.com') as Email;
      const newEmail = Email.create('newtest@example.com') as Email;
      const props: AdministratorProps = { email };
      const admin = Administrator.create(props) as Administrator;
      // 実行
      admin.changeEmail(newEmail);
      // 確認
      expect(admin.email).toEqual(newEmail);
    }); 

    test('- Failed to change value \n', () =>{
      // 準備
      const email = Email.create('test@example.com') as Email;
      const newEmail = null as unknown as Email;
      const props: AdministratorProps = { email };
      const admin = Administrator.create(props) as Administrator;
      // 実行・確認
      expect(() => admin.changeEmail(newEmail)).toThrow(EntityError);
    }); 
  });
});
