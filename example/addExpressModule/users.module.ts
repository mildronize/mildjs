import { Module } from "../../src";
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UserService]
})
export class UsersModule {}

