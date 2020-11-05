import 'reflect-metadata';
import express from 'express';
import { UsersModule } from './users/users.module';
import { useExpressServer } from '@mildjs/core';
import { Container } from 'typedi';
const app = express();

useExpressServer(app, {
    imports: [UsersModule],
    getProviderCallback: (provider: any) => Container.get(provider)
});
app.listen(3000);
console.log("server listening at port 3000")