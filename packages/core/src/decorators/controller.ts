import { getMetadataArgsStore } from '../decorators/metadata';

export const Controller = (prefix: string = ''): ClassDecorator => {
  return (target: any) => {
    getMetadataArgsStore().routes.push({
      target,
      path: prefix ? prefix : '',
      methodName: '',
    });
  };
};
