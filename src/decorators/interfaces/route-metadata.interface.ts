// import { Middleware } from 'decorators/middleware';
import { NextFunction, Response, Request } from 'express';

export type IMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export interface RouteMetadata {
  // Path to our route
  path: string;
  // HTTP Request method (get, post, ...)
  requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
  // Method name within our class responsible for this route
  methodName: string;
  // Middleware
  middlewares: IMiddleware[];
}
