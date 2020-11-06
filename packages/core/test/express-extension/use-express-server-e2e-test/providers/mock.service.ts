import { Controller, Get, Module, useExpressServer, Injectable} from '../../../../src';

@Injectable()
export class MockService{
    
    getData(): string{
        return "mock service";
    }
}
