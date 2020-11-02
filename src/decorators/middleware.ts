import { RouteMetadata } from './interfaces/route-metadata.interface';
import { MetadataArgsStore } from './metadata-args-store';

/**
 * Gets metadata args store.
 * Metadata args store follows the best practices and stores metadata in a global variable.
 */
export function getMetadataArgsStore(): MetadataArgsStore {
  if (!(global as any).routeControllerMetadataStore)
    (global as any).routeControllerMetadataStore = new MetadataArgsStore();

  return (global as any).routeControllerMetadataStore;
}

export function Use(
  // tslint:disable-next-line:array-type
  ...middlewares: Array<Function | ((request: any, response: any, next: Function) => any)>
): Function {
  return (objectOrFunction: Object | Function, methodName?: string) => {
    middlewares.forEach((middleware) => {
      getMetadataArgsStore().middlewares.push({
        target: methodName ? objectOrFunction.constructor : (objectOrFunction as Function),
        methodName: methodName || '',
        middleware,
      });
    });
  };
}

// export function GetNew(prefix?: string): Function {
//   return function (objectOrFunction: Object | Function, methodName?: string) {
//     getMetadataArgsStore().routes.push({
//       target: methodName ? objectOrFunction.constructor : (objectOrFunction as Function),
//       path: prefix ? prefix : '',
//       methodName: methodName || '',
//       requestMethod: 'get',
//     });
//   };
// }

// export const Middleware = (...middlewares: any[]): MethodDecorator => {
//   // `target` equals our class, `propertyKey` equals our decorated method name
//   return (target, propertyKey: string): void => {
//     // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
//     // To prevent any further validation simply set it to an empty array here.
//     if (!Reflect.hasMetadata('routes', target.constructor)) {
//       Reflect.defineMetadata('routes', [], target.constructor);
//     }

//     // Get the routes stored so far, extend it by the new route and re-set the metadata.
//     let routes = Reflect.getMetadata('routes', target.constructor) as RouteMetadata[];

//     let isExisted = false;
//     routes.forEach((route: any) => {
//       if (route.methodName === propertyKey) isExisted = true;
//     });

//     // If the route is not exist, add it only `methodName` and `middleware`
//     if (!isExisted) {
//       routes.push({
//         requestMethod: 'get',
//         path: '',
//         methodName: propertyKey,
//         middlewares,
//       });
//     }

//     // If the route is exist, fill the middleware only
//     routes = routes.map((route: any) => {
//       // add middleware on existing method name in `routes`
//       if (route.methodName === propertyKey)
//         return {
//           requestMethod: route.requestMethod,
//           path: route.path,
//           methodName: route.methodName,
//           middlewares,
//         };
//       return route;
//     });

//     Reflect.defineMetadata('routes', routes, target.constructor);
//   };
// };
