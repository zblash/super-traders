export interface UseCase<T, R> {
    execute(command: T): R;
  }
  