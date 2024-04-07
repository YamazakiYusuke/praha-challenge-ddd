import { validateProps } from "src/domain/entities/utils/validate-props";
import { Id } from "src/domain/values/ids";
import { createRandomIdString } from "src/util/random";

class SameId extends Id {
  static create(): SameId {
    let id = createRandomIdString();
    return new SameId(id);
  }
}
describe('# Validate Props UnitTest\n', () => {
  it('- should throw an error if id is not provided\n', () => {
    const id = null as unknown as Id;
    const props = { name: 'John', sex: 1 };

    expect(() => validateProps(id, props)).toThrow(`ID is required`);
  });

  it('- should throw an error if any prop is not provided\n', () => {
    const id = SameId.create();
    const props = { name: null, sex: 1 };

    expect(() => validateProps(id, props)).toThrow(`name is required`);
  });

  it('- should not throw an error if all props are provided\n', () => {
    const id = SameId.create();
    const props = { name: 'John', sex: 1 };

    expect(() => validateProps(id, props)).not.toThrow();
  });
});
