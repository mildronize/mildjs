import { Controller } from '../../../src';
import { getMetadataArgsStore } from '../../../src/decorators/metadata';

@Controller('/users')
class MyController { }

test('@Controller decorator: with prefix', () => {
    const routes = getMetadataArgsStore().routes;
    const expected = [{ "methodName": "", "path": "/users", "target": MyController }];
    expect(routes).toStrictEqual(expected);
});
