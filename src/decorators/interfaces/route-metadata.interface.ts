import { NextFunction, Response, Request } from 'express';

export interface RouteMetadata {
  // Path to our route
  path: string;
  // HTTP Request method (get, post, ...)
  requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
  // Method name within our class responsible for this route
  methodName: string;
  // Middleware
  middleware?: (req: Request, res: Response, next: NextFunction) => void;
}
