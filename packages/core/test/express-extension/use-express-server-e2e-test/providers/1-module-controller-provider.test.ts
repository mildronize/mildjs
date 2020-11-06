import { Controller, Get, Module, useExpressServer, Injectable } from '../../../../src';
import express, { Response } from "express";
import request from 'supertest';

import { MockService } from './mock.service';
import { MockController} from './mock.controller';

@Module({
    controllers: [MockController],
    providers: [MockService]
})
class MockModule { }

describe('Module with controller + providers (Mock service) GET (e2e)', () => {

    let app: any;
    beforeAll(async () => {
        app = express();
        useExpressServer(app, { imports: [MockModule] });
        app.listen();
    });

    it('/ [get] ', () => {
        request(app)
            .get('/')
            .expect(200)
            .expect('mock service')
    });

});
