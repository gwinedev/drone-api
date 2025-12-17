// Standard error codes

export type CustomHttpErrorStatusCodes = 400 | 401 | 403 | 404;

export class CustomHttpError extends Error {
  statusCode: CustomHttpErrorStatusCodes;

  constructor(message: string, statusCode: CustomHttpErrorStatusCodes) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends CustomHttpError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class Unauthenticated extends CustomHttpError {
  constructor(message: string) {
    super(message, 401);
  }
}
export class Forbidden extends CustomHttpError {
  constructor(message: string) {
    super(message, 403);
  }
}
export class NotFound extends CustomHttpError {
  constructor(message: string) {
    super(message, 404);
  }
}
