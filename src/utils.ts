import { Response } from 'express';
import connect from 'connect';

interface ObjectKeyString {
  [key: string]: any;
}

interface Option {
  code?: number;
  message?: string;
  data?: any;
  status?: string;
}

export function responseFormat(res: Response, opt: Option) {
  const statusCode = opt.code || 200;
  const status = opt.status || 'success';

  const responseBody: ObjectKeyString = { status };

  if (opt.data && opt.data !== undefined) {
    responseBody.data = opt.data;
  }

  if (opt.message && opt.message !== undefined) {
    responseBody.message = opt.message;
  }

  res.status(statusCode).json(responseBody);

  return responseBody;
}

export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length;
};

export const assignObject = (target: any, source: any) => {
  Object.keys(source).forEach((key) => {
    target[key] = source[key];
  });
  return target;
};

export const combineMiddlewares = (...middlewares: any[]) => {
  const chain = connect();
  middlewares.forEach((middleware) => {
    chain.use(middleware);
  });
  return chain;
};
