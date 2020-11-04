import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '..';

export function validateType(type: any, skipMissingProperties = false): RequestHandler {
  return async (req, res, next) => {
    const errors = await validate(plainToClass(type, req.body), { skipMissingProperties });

    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => Object.values(error.constraints || '')).join(', ');
      next(new HttpException(400, message));
    } else {
      next();
    }
  };
}
