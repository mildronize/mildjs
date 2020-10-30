import { RouteDecorator } from '../decorator.interface';

export function getControllerData(controller: any) {
    // The prefix saved to our controller
    const prefix = Reflect.getMetadata('prefix', controller);
    // Our `routes` array containing all our routes for this controller
    const routes: Array<RouteDecorator> = Reflect.getMetadata('routes', controller);

    return { prefix, routes };
}


interface HttpMethodDecorator {
    path?: string;
}

export function httpMethodDecorator(requestMethod: RouteDecorator['requestMethod'], data: HttpMethodDecorator): MethodDecorator {
    // `target` equals our class, `propertyKey` equals our decorated method name
    return (target, propertyKey: string): void => {
        // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
        // To prevent any further validation simply set it to an empty array here.
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        // Get the routes stored so far, extend it by the new route and re-set the metadata.
        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDecorator>;

        routes.push({
            requestMethod: requestMethod,
            path: data.path || "",
            methodName: propertyKey
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}