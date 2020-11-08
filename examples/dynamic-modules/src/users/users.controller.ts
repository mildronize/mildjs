import { Controller, Get } from '../../../../packages/core/src';
import { UsersService } from './users.service';
import { MockDataToken} from '../mock/mock.module';


@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService, 
        ){
        // console.log(this.inject.get(MockDataToken));
    }

    @Get()
    public async getUsers(req: any, res: any, next: any) {
        const data = this.usersService.find();
        res.status(200).json( data );
    }

}