import { Injectable } from '../../../../packages/core/src';

@Injectable()
export class UsersService {

    public find() {
        return { name: 'Data from service (using injectable)' };
    }
}