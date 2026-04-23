export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function assertNumberId(value: string, entityName: string): number {
  const id = Number.parseInt(value, 10);

  if (Number.isNaN(id)) {
    throw new AppError(`Invalid ${entityName} id`, 400);
  }

  return id;
}
