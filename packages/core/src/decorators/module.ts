import { ModuleMetadata } from '../interfaces/module-metadata.interface';

export const Module = (injected: ModuleMetadata = { controllers: [], providers: [] }): ClassDecorator => {
  return (target: any) => {
    if(injected === undefined) injected = {};
    Reflect.defineMetadata('module', injected, target);
  };
};
