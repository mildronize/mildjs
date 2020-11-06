import 'reflect-metadata';
import express, { Response } from 'express';
import { UsersModule } from './users/users.module';
// import { MockModule } from './mock/mock.module';
import {UsersController} from'./users/users.controller';
import { useExpressServer, Controller, Get, Injectable, Module, InjectionToken, ReflectiveInjector } from '../../../packages/core/src';
import { createConnection, Connection } from 'typeorm';
import { MockController } from './mock/mock.controller';

const app = express();
export const TYPEORM_CONNECTION = new InjectionToken<Connection>('typeorm_connection');

const connection = createConnection({
    name: 'default',
    type: 'sqlite',
    database: './app.sqlite',
    synchronize: true,
    entities: ['**/*.entity.ts'],
});

useExpressServer(app, {
    // imports: [UsersModule],
    controllers: [MockController],
    providers: [ { provide: TYPEORM_CONNECTION, useValue: connection } ]
});
app.listen(3000);
console.log("server listening at port 3000")