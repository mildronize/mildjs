import express, { Request, Response, NextFunction } from 'express';
import connect from 'connect';
import { IMiddleware, RouteMetadata } from '../decorators/interfaces/route-metadata.interface';
import { ModuleMetada } from '..';

import { asyncHelper, injectDependencies, createProviders } from './utils';

export function useExpressServer(app: express.Application, modules: any[]) {
  modules.forEach((_module) => {
    const module = Reflect.getMetadata('module', _module);
    // console.log(module);
    // console.log('addExpressControllerWithProviders');
    addExpressControllerWithProviders(app, module);
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

function addExpressControllerWithProviders(app: express.Application, module: ModuleMetada) {
  const controllers = module.controllers;
  const providerInstances = createProviders(module.providers);

  // console.log(providerInstances[0]);

  controllers.forEach((controller) => {
    const instance = injectDependencies(controller, providerInstances);
    // console.log(instance.constructor.name);

    const prefix = Reflect.getMetadata('prefix', controller);
    const routes: RouteMetadata[] = Reflect.getMetadata('routes', controller);

    const callInstance = (route: RouteMetadata) =>
      asyncHelper(async (req: Request, res: Response, next: NextFunction) => {
        await instance[route.methodName](req, res, next);
      });

    routes.forEach((route: RouteMetadata) => {
      // console.log(route);
      if (route.middlewares.length > 0) {
        // Call the middleware
        const middleware = combineMiddlewares(route.middlewares);
        // console.log(route.middlewares[0]);
        // console.log(`Mapped route: [${route.requestMethod}] '${prefix}${route.path}' use middleware 0: ${route.middlewares[0]}`);
        app[route.requestMethod](prefix + route.path, middleware, callInstance(route));
      } else {
        app[route.requestMethod](prefix + route.path, callInstance(route));
        // console.log(`Mapped route: [${route.requestMethod}] '${prefix}${route.path}'`);
      }
    });
  });
}
