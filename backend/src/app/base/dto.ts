export abstract class Dto<T> {
  abstract get toEntity(): T  
}
