import express, { Request, Response, NextFunction } from 'express';
import { ModuleMetadata } from '../interfaces/module-metadata.interface';
import { getMetadataArgsStore } from '../decorators/metadata';
import { RouteMetadataArgs } from '..';
import { DynamicModule, MiddlewareMetadataArgs, RequestMethod } from '../interfaces';
import { combineMiddlewares } from '../utils';
import { CombineRoute, combineRouteWithMiddleware } from './combine-route-with-middleware';
import { ReflectiveInjector, InjectionToken, Injectable, Type, Provider } from 'injection-js';

/**
 * `ExpressAppOption` is for setting up the **Root ModuleMetadata**,
 * These controllers , providers will be injected in the Express app,
 */

export interface ExpressAppOption extends ModuleMetadata {

}

export function useExpressServer(app: express.Application, option?: ExpressAppOption) {
  const rootImportModules = option?.imports || [];
  const rootControllerClasses = option?.controllers || [];
  const rootProviderClasses = option?.providers || [];

  let moduleMetadata: ModuleMetadata;
  let moduleClass: Type<any>;


  /**
   * Step 1: Collect all DynamicModule providers
   */

  let rootDynamicModuleProviders: Provider[] = [];
  rootImportModules.forEach((importModule: any) => {

    // If the rootImportModules is DynamicModule
    if(importModule.hasOwnProperty('module')){
      const dynamicModule : DynamicModule = importModule;
      rootDynamicModuleProviders = rootDynamicModuleProviders.concat(dynamicModule?.providers || []);
    }

  });

  /**
   * Step 2: Import All root modules to express App
   */

  rootImportModules.forEach((importModule: any) => {

    // If the rootImportModules is DynamicModule

    if (importModule.hasOwnProperty('module')) {
      console.log('hey i\'m dynamicModule');
      const dynamicModule : DynamicModule = importModule;
      moduleClass = dynamicModule.module; // Assign module class for creating the instance 

    } else if (importModule instanceof Type) {

      moduleClass = importModule; // Assign module class for creating the instance

      /**
       * Extract metadata information for the module class such as controllers, providers
       */
      moduleMetadata = Reflect.getMetadata('module', importModule);

      /**
       * Attach all `rootDynamicModuleProviders` to each module metadata
       */ 
      moduleMetadata.providers = (moduleMetadata.providers || []).concat(rootDynamicModuleProviders);
      
    } else {
      throw new Error('No module provided');
    }

    /**
     * Create instance of modules, for bootstrapping some code in each module
     * Todo: call in `onInit` instead of constructor
     */
    
    const module = createModuleInstance(moduleClass);
    console.log('Module Name: ' +  module.constructor.name);
    addModule(app, moduleMetadata, rootProviderClasses);
  });

  /**
   * Step 3: Using import root controller only, strongly recommend to import with modules
   */

  if (rootControllerClasses.length > 0) 
    addModule(app, { controllers: rootControllerClasses }, rootProviderClasses);

  return true;
}

function addModule(app: express.Application, module: ModuleMetadata, rootProvidersClasses: Provider[]) {
  console.log('Run addModule ');
  const store = getMetadataArgsStore();
  const controllers = module.controllers || [];
  const providers = module.providers || [];

  controllers.forEach((controller) => {
    /**
     * Resolving the dependencies of controllers and services
     * Then, get controller instance
     */

    const injector = ReflectiveInjector.resolveAndCreate([controller, ...providers, ...rootProvidersClasses]);
    console.log(rootProvidersClasses);
    const controllerInstance = injector.get(controller) as typeof controller;

    const combinedRoutes = combineRouteWithMiddleware(controller, store.routes, store.middlewares);
    addRouterToExpress(app, combinedRoutes, controllerInstance);
  });
}

function addRouterToExpress(app: express.Application, combinedRoutes: CombineRoute[], controllerInstance: any) {
  const prefix = getPrefix(combinedRoutes);
  combinedRoutes.forEach((route: any) => {
    if (!route.isClass) {
      const requestMethod: RequestMethod = route.requestMethod;
      const routePath = combineRouterPath(prefix, route.path);

      if (route.middlewares.length > 0) {
        // Combine multiple middlewares
        const middleware = combineMiddlewares(...route.middlewares);
        app[requestMethod](routePath, middleware, callInstance(controllerInstance, route));
      } else {
        app[requestMethod](routePath, callInstance(controllerInstance, route));
      }
    }
  });
}

export const createModuleInstance = (moduleClass: any) => {
  return new moduleClass();
};

export const combineRouterPath = (prefix: string, path: string) => {
  let result = '';
  if (prefix !== '') {
    if (prefix.charAt(0) === '/') prefix = prefix.substring(1);
    result += prefix;
  }
  result += '/';
  if (path !== '') {
    if (path.charAt(0) === '/') path = path.substring(1);
    result += path;
  }
  if (result.charAt(0) !== '/') return '/' + result;
  return result;
};

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
