import { Module } from '@mildjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ReflectiveInjector } from 'injection-js';

@Module({
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {

    constructor() {
        // Create the service instance
        const injector = ReflectiveInjector.resolveAndCreate([UsersService]);
        // Register the service locator on UsersService Class Metadata
        Reflect.defineMetadata('injector', injector, UsersService);
    }
}