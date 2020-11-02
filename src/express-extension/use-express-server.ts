import express, { Request, Response, NextFunction } from 'express';
import connect from 'connect';
import { ModuleMetadata } from '../decorators/interfaces/module-metadata.interface';
import { getMetadataArgsStore } from '../decorators/metadata';
import { RouteMetadataArgs, combineRouteWithMiddleware } from '..';
import { MiddlewareMetadataArgs, RequestMethod } from '../decorators';
import { Container } from 'typedi';

interface Option {
  container?: typeof Container;
}

export function useExpressServer(app: express.Application, modules: any[], option?: Option) {
  modules.forEach((_module) => {
    const module = Reflect.getMetadata('module', _module);
    addModuleToExpressApp(app, module, option);
  });

  return true;
}

function addModuleToExpressApp(app: express.Application, module: ModuleMetadata, option?: Option) {
  const store = getMetadataArgsStore();
  const controllers = module.controllers;
  const providers = module.providers || [];

  // From TypeDi
  const getContainer = option?.container || undefined;

  let providerInstances: any;

  // console.log(`option?.container  ${option?.container}`);
  // console.log(`getContainer ${getContainer}`);
  if (getContainer !== undefined) providerInstances = createProviders(providers, getContainer);
  // console.log(`providerInstances ${providerInstances}`);

  controllers.forEach((controller) => {
    const instance = injectDependencies(controller, providerInstances);

    const combinedRoutes = combineRouteWithMiddleware(controller, store.routes, store.middlewares);

    const prefix = getPrefix(combinedRoutes);

    combinedRoutes.forEach((route: any) => {
      if (!route.isClass) {
        const requestMethod: RequestMethod = route.requestMethod;

        if (route.middlewares.length > 0) {
          const middleware = combineMiddlewares(route.middlewares);

          app[requestMethod](prefix + route.path, middleware, callInstance(instance, route));
        } else {
          app[requestMethod](prefix + route.path, callInstance(instance, route));
        }
      }
    });
  });
}

const callInstance = (instance: any, route: RouteMetadataArgs) =>
  asyncHelper(async (req: Request, res: Response, next: NextFunction) => {
    await instance[route.methodName](req, res, next);
  });

function combineMiddlewares(middlewares: any[]) {
  const chain = connect();
  middlewares.forEach((middleware) => {
    chain.use(middleware);
  });
  return chain;
}

const getPrefix = (routes: any[]) => {
  for (const i in routes) if (routes[i].isClass) return routes[i].path;
  return '';
};

const asyncHelper = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(next);
};

export function createProviders(providers: any[], container: any) {
  return providers.map((provider) => container.get(provider));
}

export function injectDependencies(controller: any, providerInstances: any[]): any {
  if (!providerInstances) {
    const controllerInstance = new controller();

    // tslint:disable-next-line:no-console
    console.log(`WARN: Create instance of '${controllerInstance.constructor.name}' without inject the any service.`);
    /*
    If you would like to use the service, you should passing the 'Container' from 'typedi'.
    This library is designed for TypeORM & typedi only.`); 
    */

    return controllerInstance;
  }

  return new controller(...providerInstances);
}
