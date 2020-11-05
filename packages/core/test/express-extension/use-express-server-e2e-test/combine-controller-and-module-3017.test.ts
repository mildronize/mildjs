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

@Controller()
class ExtraMockController {

    @Get('/extra')
    index(req: any, res: Response) {
        res.status(200).send('OK');
    }
}

@Module({
    controllers: [ExtraMockController]
})
class ExtraMockModule { }


describe('Run controller only mode : GET (e2e)', () => {

    let app: express.Application;
    beforeAll(async () => {
        app = express();
        useExpressServer(app, { 
            imports: [ExtraMockModule],
            controllers: [MockController] 
        });
        app.listen();
    });

    it('/ [get]', () => {
        request(app)
            .get('/')
            .expect(200)
            .expect('OK')
    });

    it('/extra [get]', () => {
        request(app)
            .get('/')
            .expect(200)
            .expect('OK')
    });

});
