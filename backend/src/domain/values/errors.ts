class EntityCreationError extends Error {
  constructor(message: string) {
      super(message);
      this.name = 'EntityCreationError';

      if (Error.captureStackTrace) {
          Error.captureStackTrace(this, EntityCreationError);
      }
  }
}

class RepositoryError extends Error {
  constructor(message: string) {
      super(message);
      this.name = 'RepositoryError';

      if (Error.captureStackTrace) {
          Error.captureStackTrace(this, RepositoryError);
      }
  }
}