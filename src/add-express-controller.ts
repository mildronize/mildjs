import express, { Request, Response, NextFunction } from 'express';
import { RouteDecorator } from './decorator.interface';

const asyncHelper = (fn: any) => (
    function(req: Request, res: Response, next: NextFunction){
        fn(req, res, next).catch(next);
    }
);

export function addExpressController(app: express.Application, controllers: any[]) {

    // Iterate over all our controllers and register our routes
    controllers.forEach(controller => {
        // This is our instantiated class
        const instance = new controller();
        // if (logger) logger.info(`Added controller: ${instance.constructor.name}`);

        // The prefix saved to our controller
        const prefix = Reflect.getMetadata('prefix', controller);
        // Our `routes` array containing all our routes for this controller
        const routes: Array<RouteDecorator> = Reflect.getMetadata('routes', controller);

        const callInstance = (route: RouteDecorator) => 
            asyncHelper( async (req: Request, res: Response, next: NextFunction) => {
                 await instance[route.methodName](req, res, next);
            });
        

        // Iterate over all routes and register them to our express application 
        routes.forEach((route: RouteDecorator) => {

            if (route.hasOwnProperty("middleware") && route.middleware !== undefined) {
                // Call the middleware
                app[route.requestMethod](prefix + route.path, route.middleware, callInstance(route));
            } else {
                app[route.requestMethod](prefix + route.path, callInstance(route));
            }
            // if (logger) logger.info(`Mapped route: [${route.requestMethod}] '${prefix}${route.path}'`);

        });

    });

}