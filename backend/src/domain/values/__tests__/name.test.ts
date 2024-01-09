import { CategoryName, PairName, PersonName, TeamName } from "src/domain/values/name";

describe('# CategoryName Value UnitTest \n', () => {
  describe('## create \n', () => {
    it('- Success create instance \n', () => {
      const name = CategoryName.create('testName') as CategoryName;
      expect(name).toBeInstanceOf(CategoryName);
    });
  });
  describe('## restore \n', () => {
    it('- Success restore instance \n', () => {
      const name = CategoryName.restore('testName');
      expect(name).toBeInstanceOf(CategoryName);
      expect(name.value).toEqual('testName');
    });
  });
});

describe('# PairName Value UnitTest \n', () => {
  describe('## create \n', () => {
    it('- Success create instance \n', () => {
      const name = PairName.create('testName') as PairName;
      expect(name).toBeInstanceOf(PairName);
    });
  });
  describe('## restore \n', () => {
    it('- Success restore instance \n', () => {
      const name = PairName.restore('testName');
      expect(name).toBeInstanceOf(PairName);
      expect(name.value).toEqual('testName');
    });
  });
});

describe('# PersonName Value UnitTest \n', () => {
  describe('## create \n', () => {
    it('- Success create instance \n', () => {
      const name = PersonName.create('testName') as PersonName;
      expect(name).toBeInstanceOf(PersonName);
    });
  });
  describe('## restore \n', () => {
    it('- Success restore instance \n', () => {
      const name = PersonName.restore('testName');
      expect(name).toBeInstanceOf(PersonName);
      expect(name.value).toEqual('testName');
    });
  });
});

describe('# TeamName Value UnitTest \n', () => {
  describe('## create \n', () => {
    it('- Success create instance \n', () => {
      const name = TeamName.create('testName') as TeamName;
      expect(name).toBeInstanceOf(TeamName);
    });
  });
  describe('## restore \n', () => {
    it('- Success restore instance \n', () => {
      const name = TeamName.restore('testName');
      expect(name).toBeInstanceOf(TeamName);
      expect(name.value).toEqual('testName');
    });
  });
});
