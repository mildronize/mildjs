
import { Service } from 'typedi';

@Service()
export class UsersService {

    public find() {
        return { name: 'Data from service ' };
    }
}