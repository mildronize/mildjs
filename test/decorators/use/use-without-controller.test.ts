import { Controller, Use } from '../../../src';
import { getMetadataArgsStore } from '../../../src/decorators/metadata';

import { authMid } from './use.mock';

@Use(authMid)
class MyController { }

test('@Use decorator without @Controller: No prefix', () => {
    const middlewares = getMetadataArgsStore().middlewares;
    const expected = [{ "methodName": "", "middleware": authMid, "target": MyController }];
    expect(middlewares).toStrictEqual(expected);
});
