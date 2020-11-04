import { combineMiddlewares } from '../../src';
import express, { Response, Request, NextFunction } from 'express';
import { mockRequest, mockResponse } from 'mock-req-res';
import http from 'http';
import request from 'supertest';
import connect from 'connect';

const firstMiddleware = (req: Request, res: Response, next: NextFunction) => {
    next();
}
const secondMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.end('hello, world!');
}

describe('Combine Middlewares', () => {

    it('It should be work with 2 middlewares with http server', async (done) => {

        const combinedMiddlewares = combineMiddlewares(firstMiddleware, secondMiddleware);

        var app = connect();
        app.use(combinedMiddlewares);
        var server = http.createServer(app);

        request(server)
            .get('/')
            .expect(200, 'hello, world!', done)
    });

    it('It should be work with 2 middlewares with Express', async (done) => {

        const app = express();

        const combinedMiddlewares = combineMiddlewares(firstMiddleware, secondMiddleware);

        app.use(combinedMiddlewares);
        app.listen(3013);

        request(app)
            .get('/')
            .expect(200, 'hello, world!', done)
    });

});
