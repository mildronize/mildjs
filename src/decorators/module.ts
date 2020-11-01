import  { ModuleMetada } from './interfaces/module-metadata.interface';

export const Module = (injected: ModuleMetada = { controllers: [], providers: [] }): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('module', injected, target);
  };
};
