import { Module } from '@mildjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


@Module({
    controllers: [ UsersController ],
    providers: [ UsersService ]
})
export class UsersModule { }