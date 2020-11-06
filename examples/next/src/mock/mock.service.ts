import { useExpressServer, Controller, Get, Injectable, Module} from '../../../../packages/core/src';


@Injectable()
export class MockService{
    
    getData(): string{
        return "mock service";
    }
}