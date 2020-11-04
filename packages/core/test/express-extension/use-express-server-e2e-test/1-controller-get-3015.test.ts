import { Controller, Get, Module, useExpressServer } from '../../../src';
import express, { Response } from "express";
import request from 'supertest';

@Controller()
class MockController {

    @Get()
    index(req: any, res: Response) {
        res.status(200).send('OK');
    }
}

describe('Run controller only mode : GET (e2e)', () => {

    let app: express.Application;
    beforeAll(async () => {
        app = express();
        useExpressServer(app, { controllers: [MockController] });
        app.listen(3015);
    });

    it('/ [get]', () => {
        request(app)
            .get('/')
            .expect(200)
            .expect('OK')
    });

});
