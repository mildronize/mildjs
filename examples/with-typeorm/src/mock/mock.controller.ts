import { useExpressServer, Controller, Get, Injectable, Module, Injector } from '../../../../packages/core/src';
import {Response} from 'express';

@Controller()
export class MockController {

    constructor(private inject: Injector) { }

    @Get()
    index(req: any, res: Response) {
        res.status(200).send("tttt");
    }
}