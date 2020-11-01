import  { Controller } from '../../src';
import {UserService} from './users.service';

@Controller('/users')
export class UsersController {

    constructor(private UserService: UserService){
        console.log(`UsersController: ${this.constructor.name}`);
        console.log(UserService.getData());
    }

}