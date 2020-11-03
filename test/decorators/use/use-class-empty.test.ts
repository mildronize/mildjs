import { Controller, Use } from '../../../src';
import { getMetadataArgsStore } from '../../../src/decorators/metadata';


@Use()
@Controller()
class MyController { }

test('@Use decorator with @Controller: No prefix & empty middleware', () => {
    const middlewares = getMetadataArgsStore().middlewares;
    const expected: any[] = [];
    expect(middlewares).toStrictEqual(expected);
});
