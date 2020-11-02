import express from 'express';
import { useExpressServer } from '../../src';
import { UsersModule } from './users.module';

const app = express();

useExpressServer(app, [
    UsersModule
]);

// app.listen(4001);
// console.log('Started');
// console.log('-----------------------------');


