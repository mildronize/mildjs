import { Controller, Get, Post, Delete, Put, useExpressServer } from '../../../src';
import express, { Response } from "express";
import request from 'supertest';

@Controller()
class MockController {

    @Get()
    testGet(req: any, res: Response) {
        res.status(200).send('OK');
    }

    @Post()
    testPost(req: any, res: Response) {
        res.status(200).send('OK');
    }

    @Delete()
    testDelete(req: any, res: Response) {
        res.status(200).send('OK');
    }

    @Put()
    testPut(req: any, res: Response) {
        res.status(200).send('OK');
    }
}

describe('Run controller only mode : GET (e2e)', () => {

    let app: express.Application;
    beforeAll(async () => {
        app = express();
        useExpressServer(app, { controllers: [MockController] });
        app.listen();
    });

    it('/ [get]', () => {
        request(app)
            .get('/')
            .expect(200)
            .expect('OK')
    });

    it('/ [post]', () => {
        request(app)
            .post('/')
            .expect(200)
            .expect('OK')
    });

    it('/ [delete]', () => {
        request(app)
            .delete('/')
            .expect(200)
            .expect('OK')
    });

    it('/ [put]', () => {
        request(app)
            .put('/')
            .expect(200)
            .expect('OK')
    });

});
