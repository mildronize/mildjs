import { Controller, Use } from '../../../src';
import { getMetadataArgsStore } from '../../../src/decorators/metadata';

import { userMid, authMid, roleMid } from './use.mock';

@Use(userMid)
@Controller('/users')
class MyController {

    @Use(authMid, roleMid)
    getUser(){}

 }

test('@Use decorator with method and class ( 2 middlewares): with path prefix', () => {
    const middlewares = getMetadataArgsStore().middlewares;
    const expected = [
        { "methodName": "getUser", "middleware": authMid, "target": MyController },
        { "methodName": "getUser", "middleware": roleMid, "target": MyController },
        { "methodName": "", "middleware": userMid, "target": MyController },
    ];
    expect(middlewares).toStrictEqual(expected);
});
