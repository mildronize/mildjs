import { Controller, Get, Module, useExpressServer } from '../../../src';
import express, { Response } from "express";
import request from 'supertest';

@Controller('/extra')
class ExtraMockController {

    @Get()
    index(req: any, res: Response) {
        res.status(200).send('OK');
    }
}

@Controller()
class MockController {

    @Get()
    index(req: any, res: Response) {
        res.status(200).send('OK');
    }
}

@Module({
    controllers: [ExtraMockController]
})
class ExtraMockModule { }

@Module({
    controllers: [MockController]
})
class MockModule { }


describe('Module with controller GET (e2e)', () => {

    let app: any;
    beforeAll(async () => {
        app = express();
        useExpressServer(app, { imports: [MockModule] });
        app.listen(3011);
    });

    it('/ [get] ', () => {
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
