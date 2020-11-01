export interface IModule {
  controllers: any[];
  providers: any[];
}

export const Module = (injected: IModule = { controllers: [], providers: [] }): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('module', injected, target);
  };
};
