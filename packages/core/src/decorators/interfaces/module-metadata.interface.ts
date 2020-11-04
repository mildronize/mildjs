/**
 * Using for `@Module` decorator
 */

export interface ModuleMetadata {
  /**
   * Importing modules class (Not object)
   */

  imports?: any[];

  /**
   * Adding controllers class to the modules (Not object)
   */

  controllers?: any[];

  /**
   * Service provider class, e.g. API, connect with the database (Not object)
   */

  providers?: any[];
}
