import { RouteDecorator } from './interfaces/route-metadata.interface';

export function getControllerData(controller: any) {
  // The prefix saved to our controller
  const prefix = Reflect.getMetadata('prefix', controller);
  // Our `routes` array containing all our routes for this controller
  const routes: RouteDecorator[] = Reflect.getMetadata('routes', controller);

  return { prefix, routes };
}
