import { getMetadataArgsStore } from '../decorators/metadata';
// import { makeDecorator } from '@mildjs/di';
import { makeInjectableDecorator } from '@mildjs/di';

export const Controller = (prefix: string = ''): ClassDecorator => {
  return (target: any) => {
    /**
     * Add marker @Injectable to @Controller decorator, for resolving dependencies
     */

    // makeDecorator('Injectable', []);
    makeInjectableDecorator(target);
    /**
     * Store meta of the @Controller decorator, for using in generate Express route in `useExpressServer`
     */

    getMetadataArgsStore().routes.push({
      target,
      path: prefix ? prefix : '',
      methodName: '',
    });
  };
};
