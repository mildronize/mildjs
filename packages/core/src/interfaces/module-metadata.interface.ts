import { Type } from './type.interface';
import { DynamicModule } from './dynamic-module.interface';
import { Provider } from '@mildjs/di';

/**
 * Metadata for `@Module` decorator
 */

export interface ModuleMetadata {
  /**
   * Optional list of imported modules: Importing modules class (Not object)
   * The module should export the providers which are required in this module.
   */

  // tslint:disable-next-line:array-type
  imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule>>;

  /**
   * Optional list of controllers: Adding controllers class to the modules (Not object)
   */

  controllers?: Type<any>[];

  /**
   * Optional list of providers: Service provider class, e.g. API, connect with the database (Not object)
   */

  providers?: Provider[];

  /**
   * Optional list of exports: It uses to export provider outside the module
   */

  // tslint:disable-next-line:array-type
  exports?: Array<DynamicModule | Promise<DynamicModule> | Provider | string | symbol>;
}
