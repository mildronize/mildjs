import { Controller, Use } from '../../../src';
import { getMetadataArgsStore } from '../../../src/decorators/metadata';

import { authMid } from './use.mock';

@Use(authMid)
@Controller('/users')
class MyController { }

test('@Use decorator with class @Controller: with path prefix', () => {
    const middlewares = getMetadataArgsStore().middlewares;
    const expected = [{ "methodName": "", "middleware": authMid, "target": MyController }];
    expect(middlewares).toStrictEqual(expected);
});
