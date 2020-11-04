import express, { Request, Response, NextFunction } from 'express';
import { ModuleMetadata } from '../decorators/interfaces/module-metadata.interface';
import { getMetadataArgsStore } from '../decorators/metadata';
import { RouteMetadataArgs } from '..';
import { MiddlewareMetadataArgs, RequestMethod } from '../decorators';
import { combineMiddlewares } from '../utils';
// import { Container } from 'typedi';
import { CombineRoute, combineRouteWithMiddleware } from './combine-route-with-middleware';

interface Option {
  getProviderCallback?: Function;
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
  const getProviderCallback = option?.getProviderCallback || undefined;
  const providerInstances = createProviders(providers, getProviderCallback);

  controllers.forEach((controller) => {
    const controllerInstance = injectDependencies(controller, providerInstances || []);
    const combinedRoutes = combineRouteWithMiddleware(controller, store.routes, store.middlewares);
    addRouterToExpress(app, combinedRoutes, controllerInstance);
  });
}

function addRouterToExpress(app: express.Application, combinedRoutes: CombineRoute[], controllerInstance: any) {
  const prefix = getPrefix(combinedRoutes);
  combinedRoutes.forEach((route: any) => {
    if (!route.isClass) {
      const requestMethod: RequestMethod = route.requestMethod;
      const routePath = prefix + route.path;

      if (route.middlewares.length > 0) {
        const middleware = combineMiddlewares(...route.middlewares);
        app[requestMethod](routePath, middleware, callInstance(controllerInstance, route));
      } else {
        app[requestMethod](routePath, callInstance(controllerInstance, route));
      }
    }
  });
}

const callInstance = (instance: any, route: RouteMetadataArgs) =>
  asyncHelper(async (req: Request, res: Response, next: NextFunction) => {
    await instance[route.methodName](req, res, next);
  });

export const getPrefix = (routes: any[]) => {
  for (const i in routes) if (routes[i].isClass) return routes[i].path;
  return '';
};

export const asyncHelper = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(next);
};

/*
If you are using 'typedi' you can passing container.get() into this

Get the services using Container.get([Service Name]) from 'typedi'

For setup the service, using @Service(), example

@Service()
class MyService{}
*/

export function createProviders(providers: any[], getProviderCallback: any) {
  if (getProviderCallback === undefined) {
    // tslint:disable-next-line:no-console
    console.log(`WARN: Create empty provider instance, it may not work`);
    return providers.map((provider) => new provider());
  }
  return providers.map((provider) => getProviderCallback(provider));
}

export function injectDependencies(controller: any, providerInstances: any[]): any {
  if (providerInstances.length === 0) {
    // tslint:disable-next-line:no-console
    console.log(`WARN: Create controller instance  without inject the any service.`);
    /*
    If you would like to use the service, you should passing the 'Container' from 'typedi'.
    This library is designed for TypeORM & typedi only.`); 
    */
  }
  return new controller(...providerInstances);
}
