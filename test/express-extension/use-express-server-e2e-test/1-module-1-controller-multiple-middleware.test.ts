import { Controller, Get, HttpException, Module, Use, useExpressServer } from '../../../src';
import express, { Response } from "express";
import request from 'supertest';

export const authMid = (req: any, res: any, next: any) => { };
export const roleMid = (req: any, res: any, next: any) => { };
export const unauthorizedMid = (req: any, res: any, next: any) => { 
    next(new HttpException(401, "unauthorized"))
};

@Use(authMid)
@Controller()
class MockController {

    @Use(roleMid)
    @Get()
    index(req: any, res: Response) {
        res.status(200).send('OK');
    }

    @Use(unauthorizedMid)
    @Get('/unauthorized')
    unauthorized(req: any, res: Response) {
        res.status(200).send('OK');
    }
}

@Module({
    controllers: [MockController]
})
class MockModule { }


describe('Module with controller (Middleware) (e2e)', () => {

    let app: express.Application;
    beforeAll(async () => {
        app = express();
        useExpressServer(app, [MockModule]);
        app.listen(3013);
    });

    it('/ [get]', () => {
        request(app)
            .get('/')
            .expect(200)
            .expect('OK')
    });

    it('/unauthorized [get]', () => {
        request(app)
            .get('/unauthorized')
            .expect(401)
            .expect('unauthorized')
    });

});
