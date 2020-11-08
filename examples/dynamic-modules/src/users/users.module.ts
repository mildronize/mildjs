import { Module } from '../../../../packages/core/src';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule { }