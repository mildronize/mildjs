import { ModuleMetadata } from './module-metadata.interface'
import { Type } from './type.interface';

export interface DynamicModule extends ModuleMetadata {

    /**
     * A module reference
     */
    
    module: Type<any>;
}