import { Controller, Use } from '../../../src';
import { getMetadataArgsStore } from '../../../src/decorators/metadata';

import { authMid } from './use.mock';


@Controller('/users')
class MyController {

    @Use(authMid)
    getUser(){}

 }

test('@Use decorator with 1 method: with path prefix', () => {
    const middlewares = getMetadataArgsStore().middlewares;
    const expected = [{ "methodName": "getUser", "middleware": authMid, "target": MyController }];
    expect(middlewares).toStrictEqual(expected);
});
