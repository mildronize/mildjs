import { Controller, Get, Module, useExpressServer } from '../../../src';
import express, { Response } from "express";
import request from 'supertest';
import { Service } from 'typedi';

@Controller()
class MockController {

    constructor(private mockService: MockService){}

    @Get()
    index(req: any, res: Response) {
        const data = this.mockService.getData();
        res.status(200).send(data);
    }
}

@Service()
class MockService{
    
    getData(): string{
        return "mock service";
    }
}

@Module({
    controllers: [MockController],
    providers: [MockService]
})
class MockModule { }


describe('Module with controller + providers (Mock service) GET (e2e)', () => {

    let app: any;
    beforeAll(async () => {
        app = express();
        useExpressServer(app, [MockModule]);
        app.listen(3012);
    });

    it('/ [get] ', () => {
        request(app)
            .get('/')
            .expect(200)
            .expect('mock service')
    });

});
