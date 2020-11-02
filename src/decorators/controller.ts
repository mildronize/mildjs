import { getMetadataArgsStore } from '../';

export const Controller = (prefix: string = ''): ClassDecorator => {
  return (target: any) => {
    getMetadataArgsStore().routes.push({
      target,
      path: prefix ? prefix : '',
      methodName: '',
    });

    // Reflect.defineMetadata('prefix', prefix, target);

    // // Since routes are set by our methods this should almost never be true (except the controller has no methods)
    // if (!Reflect.hasMetadata('routes', target)) {
    //   Reflect.defineMetadata('routes', [], target);
    // }
  };
};
