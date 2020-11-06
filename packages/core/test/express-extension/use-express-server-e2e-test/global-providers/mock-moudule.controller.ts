import { Controller, Get, Module, useExpressServer, Injectable, Injector } from '../../../../src';
import { Response } from 'express';
import { GLOBAL_VAR} from './1-module-controller-global-provider.test';

@Controller()
export class MockModuleController {

    constructor(private inject: Injector) { }

    @Get()
    index(req: any, res: Response) {
        const data = this.inject.get(GLOBAL_VAR);
        res.status(200).send(data);
    }
}