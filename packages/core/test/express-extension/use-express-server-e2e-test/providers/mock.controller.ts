import { Controller, Get, Module, useExpressServer, Injectable } from '../../../../src';
import { Response } from 'express';
import { MockService } from './mock.service';
@Controller()
export class MockController {

    constructor(private mockService: MockService) { }

    @Get()
    index(req: any, res: Response) {
        const data = this.mockService.getData();
        res.status(200).send(data);
    }
}