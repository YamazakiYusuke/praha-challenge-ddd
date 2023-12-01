import { SomeData } from 'src/domain/entities/some-data'

export interface ISomeDataRepository {
  save(someData: SomeData): Promise<SomeData>
}
