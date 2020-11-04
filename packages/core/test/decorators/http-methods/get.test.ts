import { Controller, Get } from '../../../src';
import { getMetadataArgsStore } from '../../../src/decorators/metadata';

@Controller()
class MyController {

    @Get()
    getUser(){}

 }

test('get method', () => {
    const routes = getMetadataArgsStore().routes;
    const expected = [
        { "methodName": "getUser", "path": "", "requestMethod": "get", "target": MyController },
        { "methodName": "", "path": "", "target": MyController },
    ];
    expect(routes).toStrictEqual(expected);
});
