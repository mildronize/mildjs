import { Controller } from '../../../src';
import { getMetadataArgsStore } from '../../../src/decorators/metadata';

@Controller()
class MyController { }


test('@Controller decorator: No prefix', () => {
    const routes = getMetadataArgsStore().routes;
    const expected = [{ "methodName": "", "path": "", "target": MyController }];
    expect(routes).toStrictEqual(expected);
});
