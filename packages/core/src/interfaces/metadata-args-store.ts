// This will use to call app.get / app.post ..... of express
export type RequestMethod = 'get' | 'post' | 'delete' | 'options' | 'put';

export interface MiddlewareMetadataArgs {
  target: Function;
  methodName: string;
  middleware: Function;
}

export interface RouteMetadataArgs {
  target: Function;

  // Path to our route
  path: string;

  // HTTP Request method (get, post, ...)
  requestMethod?: RequestMethod;

  // Method name within our class responsible for this route
  methodName: string;
}

export class MetadataArgsStore {
  /**
   *
   * Registered controller metadata args.
   */
  // controllers: ControllerMetadataArgs[] = [];

  /**
   *
   * Registered middleware metadata args.
   */
  middlewares: MiddlewareMetadataArgs[] = [];

  /**
   *
   * Registered middleware metadata args.
   */
  routes: RouteMetadataArgs[] = [];
}
