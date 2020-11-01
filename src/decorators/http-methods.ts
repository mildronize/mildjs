import { RouteDecorator } from './interfaces/route-metadata.interface';

export const Get = (path: string): MethodDecorator => httpMethodDecorator('get', { path });
export const Post = (path: string): MethodDecorator => httpMethodDecorator('post', { path });
export const Put = (path: string): MethodDecorator => httpMethodDecorator('put', { path });
export const Delete = (path: string): MethodDecorator => httpMethodDecorator('delete', { path });

interface HttpMethodDecorator {
  path?: string;
}

export function httpMethodDecorator(
  requestMethod: RouteDecorator['requestMethod'],
  data: HttpMethodDecorator,
): MethodDecorator {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return (target, propertyKey: string): void => {
    // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
    // To prevent any further validation simply set it to an empty array here.
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    // Get the routes stored so far, extend it by the new route and re-set the metadata.
    let routes = Reflect.getMetadata('routes', target.constructor) as RouteDecorator[];

    let isExisted = false;
    routes.forEach((route: any) => {
      if (route.methodName === propertyKey) isExisted = true;
    });

    // If the route is not exist, add it the new route
    if (!isExisted) {
      routes.push({
        requestMethod,
        path: data.path || '',
        methodName: propertyKey,
      });
    }

    // If the route is exist,
    routes = routes.map((route: any) => {
      // add middleware on existing method name in `routes`
      if (route.methodName === propertyKey)
        return {
          requestMethod,
          path: data.path || '',
          methodName: route.methodName,
          middleware: route.middleware,
        };
      return route;
    });

    // console.log(routes);

    Reflect.defineMetadata('routes', routes, target.constructor);
  };
}
