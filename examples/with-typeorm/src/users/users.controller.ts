import { Controller, Get, Injector } from '../../../../packages/core/src';
import { UsersService } from './users.service';
import { TYPEORM_CONNECTION } from '../index';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get()
    public async getUsers(req: any, res: any, next: any) {
        const data = this.usersService.find();
        res.status(200).json( data );
    }

    @Get('add')
    public async addUser(req: any, res: any, next: any) {
        const data = this.usersService.addData();
        res.status(200).json( { message: 'success'} );
    }

}