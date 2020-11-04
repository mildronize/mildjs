import { Controller, Use } from '../../../src';
import { getMetadataArgsStore } from '../../../src/decorators/metadata';

import { authMid } from './use.mock';

@Use(authMid)
@Controller()
class MyController { }

test('@Use decorator with @Controller: No prefix', () => {
    const middlewares = getMetadataArgsStore().middlewares;
    const expected = [{ "methodName": "", "middleware": authMid, "target": MyController }];
    expect(middlewares).toStrictEqual(expected);
});
