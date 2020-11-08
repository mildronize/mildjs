import 'reflect-metadata';
import express, { Response } from 'express';
import { UsersModule } from './users/users.module';
import { MockModule } from './mock/mock.module';
import { useExpressServer, Controller, Get, Injectable, Module } from '../../../packages/core/src';

const app = express();

useExpressServer(app, {
    imports: [
        UsersModule,
        // MockModule.forFeature() 
    ]
});
app.listen(3000);
console.log("server listening at port 3000")