import express, { Request, Response, NextFunction } from 'express';
import { RouteDecorator } from '../decorators/interfaces/route-metadata.interface';
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

function addExpressControllerWithProviders(app: express.Application, module: ModuleMetada) {
  const controllers = module.controllers;
  const providerInstances = createProviders(module.providers);

  // console.log(providerInstances[0]);

  controllers.forEach((controller) => {
    const instance = injectDependencies(controller, providerInstances);
    // console.log(instance.constructor.name);

    const prefix = Reflect.getMetadata('prefix', controller);
    const routes: RouteDecorator[] = Reflect.getMetadata('routes', controller);

    const callInstance = (route: RouteDecorator) =>
      asyncHelper(async (req: Request, res: Response, next: NextFunction) => {
        await instance[route.methodName](req, res, next);
      });

    routes.forEach((route: RouteDecorator) => {
      if (route.hasOwnProperty('middleware') && route.middleware !== undefined) {
        // Call the middleware
        app[route.requestMethod](prefix + route.path, route.middleware, callInstance(route));
      } else {
        app[route.requestMethod](prefix + route.path, callInstance(route));
      }
    });
  });
}
