import { RouteMetadata } from './interfaces/route-metadata.interface';
import { getMetadataArgsStore } from './metadata';

export const Get = (path?: string): Function => httpMethodDecorator('get', path);
export const Post = (path?: string): Function => httpMethodDecorator('post', path);
export const Put = (path?: string): Function => httpMethodDecorator('put', path);
export const Delete = (path?: string): Function => httpMethodDecorator('delete', path);

export function httpMethodDecorator(requestMethod: RouteMetadata['requestMethod'], path?: string): Function {
  return (objectOrFunction: Object | Function, methodName?: string) => {
    getMetadataArgsStore().routes.push({
      target: methodName ? objectOrFunction.constructor : (objectOrFunction as Function),
      path: path ? path : '',
      methodName: methodName || '',
      requestMethod,
    });
  };
}
