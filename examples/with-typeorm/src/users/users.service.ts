import { Injectable } from '../../../../packages/core/src';
import { UserEntity } from './users.entity';
import { TYPEORM_CONNECTION } from '../index';
import { Injector } from '../../../../packages/core/src';
import { Connection } from 'typeorm';


@Injectable()
export class UsersService {

    private connection: Connection;

    private async initConnection() {
        this.connection = await this.injector.get(TYPEORM_CONNECTION);
    }

    constructor(private injector: Injector) {
        this.initConnection();
    }

    public find() {
        return { name: 'Data from service (using injectable)' };
    }

    public async addData() {
        let user = new UserEntity();
        user.name = "Thada";

        const repo = this.connection.getRepository(UserEntity);
        // console.log(this.connection);
        await repo.save(user);
        console.log("Photo has been saved");

        // return this.connection.manager
        //         .save(user)
        //         .then(photo => {
        //             console.log("Photo has been saved. Photo id is", photo.id);
        //         });
    }
}