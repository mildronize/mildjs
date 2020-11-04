import { Controller, Use } from '../../../src';
import { getMetadataArgsStore } from '../../../src/decorators/metadata';

import { userMid, authMid } from './use.mock';

@Use(userMid)
@Controller('/users')
class MyController {

    @Use(authMid)
    getUser(){}

 }

test('@Use decorator with class and method: with path prefix', () => {
    const middlewares = getMetadataArgsStore().middlewares;
    const expected = [
        { "methodName": "getUser", "middleware": authMid, "target": MyController },
        { "methodName": "", "middleware": userMid, "target": MyController }
    ];
    expect(middlewares).toStrictEqual(expected);
});
