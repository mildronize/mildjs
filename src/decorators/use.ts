import { getMetadataArgsStore } from './metadata';

export function Use(
  // tslint:disable-next-line:array-type
  ...middlewares: Array<Function | ((request: any, response: any, next: Function) => any)>
): Function {
  return (objectOrFunction: Object | Function, methodName?: string) => {
    middlewares.forEach((middleware) => {
      getMetadataArgsStore().middlewares.push({
        target: methodName ? objectOrFunction.constructor : (objectOrFunction as Function),
        methodName: methodName || '',
        middleware,
      });
    });
  };
}
