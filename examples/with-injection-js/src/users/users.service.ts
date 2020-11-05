
import { Injectable } from 'injection-js';

@Injectable()
export class UsersService {

    public find() {
        return { name: 'Data from service (using injection-js) ' };
    }
}