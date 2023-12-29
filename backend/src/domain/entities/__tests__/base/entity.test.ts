import { Entity } from "src/domain/entities/base/entity";
import { Id } from "src/domain/values/id";


interface SameProps {
  name: string; 
  sex: Number;
}
class SameEntity extends Entity<SameProps> {
  constructor(id: Id, props: SameProps) {
    super(id, props);
  }
}

describe('# Base Entity UnitTest\n', () => {
  it('- should correctly return the id\n', () => {
    // 準備
    const id = Id.create();
    const entity = new SameEntity(id, {name: 'John', sex: 1});
    // 実行・確認
    expect(entity.getId).toEqual(id);
  });

  it('- should correctly compare two entities\n', () => {
    // 準備
    const id1 = Id.create();
    const id2 = Id.create();
    const entity1 = new SameEntity(id1, {name: 'John', sex: 1});
    const entity2 = new SameEntity(id2, {name: 'Jane', sex: 0});
    const entity3 = new SameEntity(id1, {name: 'John', sex: 1});
    // 実行・確認
    expect(entity1.isEqual(entity2)).toBe(false);
    expect(entity1.isEqual(entity3)).toBe(true);
  });
});
