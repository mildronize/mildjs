import { useExpressServer, Controller, Get, Injectable, Module } from '../../../../packages/core/src';
import { MockService } from './mock.service';
import {Response} from 'express';

@Controller()
export class MockController {

    constructor(private mockService: MockService) { }

    @Get()
    index(req: any, res: Response) {
        const data = this.mockService.getData();
        res.status(200).send(data);
    }
}