import { Controller, Get } from '@mildjs/core';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get()
    public async getUsers(req: any, res: any, next: any) {
        const data = this.usersService.find();
        res.status(200).json( data );
    }

}