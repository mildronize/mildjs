import { getMetadataArgsStore } from '../decorators/metadata';
import { RouteMetadataArgs } from '../decorators/interfaces/metadata-args-store';
import { MiddlewareMetadataArgs, RequestMethod } from '../decorators';

export interface CombineRoute {
  target: Function;
  path: string;
  methodName: string;
  requestMethod?: RequestMethod;
  isClass: boolean;
  middlewares: any[];
}

export function combineRouteWithMiddleware(
  controller: any,
  routes: RouteMetadataArgs[],
  middlewares: MiddlewareMetadataArgs[],
) {
  const exportedRoutes: CombineRoute[] = [];
  // For target Class, Add all route which is matching the target controller, then provide middleware for the routes.
  routes.forEach((route: RouteMetadataArgs) => {
    if (controller === route.target) {
      exportedRoutes.push({
        ...route,
        isClass: isClassRoute(route),
        middlewares: [],
      });
    }
  });

  let classRoute: any;
  // find class metadata, add to all method
  exportedRoutes.forEach((route) => {
    if (route.isClass) classRoute = route;
  });

  // if there is class route
  if (classRoute === undefined) throw new Error('`@Controller` must be provided');

  // add middlewares to the class controller (classRoute)
  middlewares.forEach((middleware) => {
    if (classRoute.target === middleware.target && isClassMiddleware(middleware)) {
      classRoute.middlewares.push(middleware.middleware);
    }
  });

  // console.log('classRoute');
  // console.log(classRoute);

  // apply middleware of the class controller to all methods
  exportedRoutes.forEach((route) => {
    if (!route.isClass) {
      route.middlewares = route.middlewares.concat(classRoute.middlewares);
    }
  });

  // apply middleware of the method to the method.
  middlewares.forEach((middleware) => {
    if (!isClassMiddleware(middleware) && controller === middleware.target) {
      exportedRoutes.forEach((route) => {
        if (!route.isClass && route.methodName === middleware.methodName) {
          route.middlewares.push(middleware.middleware);
        }
      });
    }
  });

  return exportedRoutes;
}

function isClassRoute(route: RouteMetadataArgs) {
  return route.methodName === '' ? true : false;
}

function isClassMiddleware(middleware: MiddlewareMetadataArgs) {
  return middleware.methodName === '' ? true : false;
}
