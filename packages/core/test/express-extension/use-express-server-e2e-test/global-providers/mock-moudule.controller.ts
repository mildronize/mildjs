import { Controller, Get, Module, useExpressServer, Injectable , Inject} from '../../../../src';
import { Response } from 'express';
// import { GLOBAL_VAR} from './token';

@Controller()
export class MockModuleController {

    constructor(@Inject('GLOBAL_VAR') private data: string) { }

    @Get()
    index(req: any, res: Response) {
        // const data = this.inject.get(GLOBAL_VAR);
        res.status(200).send(this.data);
    }
}