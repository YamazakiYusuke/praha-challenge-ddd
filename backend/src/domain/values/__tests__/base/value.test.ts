import { Value } from "src/domain/values/base/value";

class SameValue extends Value<string> {
  constructor(value: string) {
    super(value)
  }
}

describe('# Value UnitTest\n', () => {

  describe('## isEqual\n', () => {
    test('- Success compare instance \n', () => {
      // 準備・実行
      const value1 = new SameValue("Test Value");
      const value2 = new SameValue("Test Value");
      // 確認
      expect(value1.isEqual(value2)).toBe(true);
    });

    test('- Failed compare instance \n', () => {
      // 準備・実行
      const value1 = new SameValue("Test Value");
      const value2 = new SameValue("Different Value");
      // 確認
      expect(value1.isEqual(value2)).toBe(false);
    });
  });
});
