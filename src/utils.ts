import { Response } from 'express';

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