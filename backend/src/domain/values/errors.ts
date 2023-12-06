class EntityCreationError extends Error {
  constructor(message: string) {
      super(message);
      this.name = 'EntityCreationError';

      if (Error.captureStackTrace) {
          Error.captureStackTrace(this, EntityCreationError);
      }
  }
}

class EntityStateModificationError extends Error {
  constructor(message: string) {
      super(message);
      this.name = 'EntityStateModificationError';

      if (Error.captureStackTrace) {
          Error.captureStackTrace(this, EntityStateModificationError);
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