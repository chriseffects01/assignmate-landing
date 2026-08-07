export class OfflineError extends Error {
  constructor() {
    super('Device is offline');
    this.name = 'OfflineError';
  }
}

export class UnathourizedError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}

export class UnknownServerError extends Error {
  constructor() {
    super('Unknown server error');
    this.name = 'UnknownServerError';
  }
}
