import { Controller, Get, Module, useExpressServer, InjectionToken } from '../../../../src';
import express, { Response } from "express";
import request from 'supertest';
import {GLOBAL_VAR} from './token';

import { MockModuleController} from './mock-moudule.controller';

@Module({
    controllers: [MockModuleController]
})
class MockModule { }


describe('Module with controller + Global providers (Mock service) GET (e2e)', () => {

    let app: any;
    beforeAll(async () => {
        app = express();
        
        useExpressServer(app, { 
            imports: [MockModule],
            providers: [{ provide: GLOBAL_VAR, useValue: "global mock data" } ]
         });
        app.listen();
    });

    it('/ [get] ', () => {
        request(app)
            .get('/')
            .expect(200)
            .expect('global mock data')
    });

});
