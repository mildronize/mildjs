import { useExpressServer, Controller, Get, Injectable, Module} from '../../../../packages/core/src';
import {MockController} from './mock.controller';
import {MockService} from './mock.service';

@Module({
    controllers: [MockController],
    providers: [MockService]
})
export class MockModule { }
