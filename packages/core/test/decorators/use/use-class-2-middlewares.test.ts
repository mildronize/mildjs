import { Controller, Use } from '../../../src';
import { getMetadataArgsStore } from '../../../src/decorators/metadata';

import { authMid, userMid } from './use.mock';

@Use(authMid, userMid)
@Controller()
class MyController { }

test('@Use decorator with @Controller: No prefix', () => {
    const middlewares = getMetadataArgsStore().middlewares;
    const expected = [
        { "methodName": "", "middleware": authMid, "target": MyController },
        { "methodName": "", "middleware": userMid, "target": MyController }
    ];
    expect(middlewares).toStrictEqual(expected);
});
