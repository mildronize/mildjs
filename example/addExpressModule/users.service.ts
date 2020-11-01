import { Service } from 'typeorm-di';

@Service()
export class UserService {

    public getData(): string {
        return "This is user service";
    }

    constructor(){
        console.log(`UserService: ${this.constructor.name}`);
    }
}