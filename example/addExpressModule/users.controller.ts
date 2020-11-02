import  { Controller } from '../../src';
import {UserService} from './users.service';

@Controller('/users')
export class UsersController {

    constructor(private userService: UserService){
        // tslint:disable-next-line:no-console
        console.log(`UsersController: ${this.constructor.name}`);
        // tslint:disable-next-line:no-console
        console.log(userService.getData());
    }

}