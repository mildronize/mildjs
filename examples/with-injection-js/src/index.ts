import 'reflect-metadata';
import express from 'express';
import { UsersModule } from './users/users.module';
import { useExpressServer } from '@mildjs/core';

const app = express();

useExpressServer(app, {
    imports: [UsersModule],
    getProviderCallback: (provider: any) => {
        // get `injector` registered in Module metadata 
        const injector = Reflect.getMetadata('injector', provider);
        // return provider instance
        return injector.get(provider);
    }
});
app.listen(3000);
console.log("server listening at port 3000");