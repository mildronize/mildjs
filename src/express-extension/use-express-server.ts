import express, { Request, Response, NextFunction } from 'express';
import connect from 'connect';
import { IMiddleware, RouteMetadata } from '../decorators/interfaces/route-metadata.interface';
import { ModuleMetada } from '..';

import { asyncHelper, injectDependencies, createProviders } from './utils';
import { getMetadataArgsStore, RouteMetadataArgs, combineRouteWithMiddleware } from '..';
import { MiddlewareMetadataArgs, RequestMethod } from '../decorators';

const callInstance = (instance: any, route: RouteMetadataArgs) =>
  asyncHelper(async (req: Request, res: Response, next: NextFunction) => {
    await instance[route.methodName](req, res, next);
  });

export function addExpressV2(app: express.Application, module: ModuleMetada) {
  const store = getMetadataArgsStore();
  const controllers = module.controllers;
  const providerInstances = createProviders(module.providers || []);

  controllers.forEach((controller) => {
    // const instance = new controller();
    const instance = injectDependencies(controller, providerInstances);

    const combinedRoutes = combineRouteWithMiddleware(controller, store.routes, store.middlewares);

    // console.log('combinedRoutes');
    // console.log(combinedRoutes);

    const getPrefix = (routes: any[]) => {
      for (const i in routes) if (routes[i].isClass) return routes[i].path;
      return '';
    };

    const prefix = getPrefix(combinedRoutes);

    // console.log(prefix);

    combinedRoutes.forEach((route: any) => {
      if (!route.isClass) {
        const requestMethod: RequestMethod = route.requestMethod;

        // console.log(route);
        if (route.middlewares.length > 0) {
          // Call the middleware
          const middleware = combineMiddlewares(route.middlewares);
          // console.log(route.middlewares[0]);
          // console.log(
          //   `Mapped route: [${route.requestMethod}] '${prefix}${route.path}' use middleware : ${route.middlewares}`,
          // );

          app[requestMethod](prefix + route.path, middleware, callInstance(instance, route));
        } else {
          app[requestMethod](prefix + route.path, callInstance(instance, route));
          // console.log(`Mapped route: [${route.requestMethod}] '${prefix}${route.path}'`);
        }
      }
    });
  });
}

export function useExpressServer(app: express.Application, modules: any[]) {
  modules.forEach((_module) => {
    const module = Reflect.getMetadata('module', _module);
    addExpressV2(app, module);
    // addExpressControllerWithProviders(app, module);
  });

  return true;
}

function combineMiddlewares(middlewares: IMiddleware[]) {
  const chain = connect();
  middlewares.forEach((middleware) => {
    chain.use(middleware);
  });
  return chain;
}

// function addExpressControllerWithProviders(app: express.Application, module: ModuleMetada) {
//   const controllers = module.controllers;
//   const providerInstances = createProviders(module.providers);

//   // console.log(providerInstances[0]);

//   controllers.forEach((controller) => {
//     const instance = injectDependencies(controller, providerInstances);
//     // console.log(instance.constructor.name);

//     const prefix = Reflect.getMetadata('prefix', controller);
//     const routes: RouteMetadata[] = Reflect.getMetadata('routes', controller);

//     const callInstance = (route: RouteMetadata) =>
//       asyncHelper(async (req: Request, res: Response, next: NextFunction) => {
//         await instance[route.methodName](req, res, next);
//       });

//     routes.forEach((route: RouteMetadata) => {
//       // console.log(route);
//       if (route.middlewares.length > 0) {
//         // Call the middleware
//         const middleware = combineMiddlewares(route.middlewares);
//         // console.log(route.middlewares[0]);
//         // console.log(`Mapped route: [${route.requestMethod}] '${prefix}${route.path}' use middleware 0: ${route.middlewares[0]}`);
//         app[route.requestMethod](prefix + route.path, middleware, callInstance(route));
//       } else {
//         app[route.requestMethod](prefix + route.path, callInstance(route));
//         // console.log(`Mapped route: [${route.requestMethod}] '${prefix}${route.path}'`);
//       }
//     });
//   });
// }
