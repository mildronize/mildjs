import express, { Request, Response, NextFunction } from 'express';
import { RouteDecorator } from '../decorators/decorator.interface';
import { IModule } from '..';

import { asyncHelper , injectDependencies, createProviders } from './utils';

// This function is Deprecated

export function addExpressController(app: express.Application, controllers: any[]) {
    console.log("The function: addExpressController is deprecated, please use`")
    // Iterate over all our controllers and register our routes
    controllers.forEach((controller) => {
      // This is our instantiated class
      const instance = new controller();
      // if (logger) logger.info(`Added controller: ${instance.constructor.name}`);
  
      // The prefix saved to our controller
      const prefix = Reflect.getMetadata('prefix', controller);
      // Our `routes` array containing all our routes for this controller
      const routes: RouteDecorator[] = Reflect.getMetadata('routes', controller);
  
      const callInstance = (route: RouteDecorator) =>
        asyncHelper(async (req: Request, res: Response, next: NextFunction) => {
          await instance[route.methodName](req, res, next);
        });
  
      // Iterate over all routes and register them to our express application
      routes.forEach((route: RouteDecorator) => {
        if (route.hasOwnProperty('middleware') && route.middleware !== undefined) {
          // Call the middleware
          app[route.requestMethod](prefix + route.path, route.middleware, callInstance(route));
        } else {
          app[route.requestMethod](prefix + route.path, callInstance(route));
        }
        // if (logger) logger.info(`Mapped route: [${route.requestMethod}] '${prefix}${route.path}'`);
      });
    });
    return true;
  }
