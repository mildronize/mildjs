import { combineRouterPath } from '../../../src/express-extension/use-express-server';

describe('combineRouterPath', () => {

    it(`path: '' & '' path should be '/'`, () => {
        const result = combineRouterPath('','');
        const expected = '/';
        expect(expected).toBe(result);
    });

    it(`path: '/' & '' should be '/'`, () => {
        const result = combineRouterPath('/','');
        const expected = '/';
        expect(expected).toBe(result);
    });

    it(`path: '' & '/' should be '/'`, () => {
        const result = combineRouterPath('','/');
        const expected = '/';
        expect(expected).toBe(result);
    });

    it(`path: '/' & '/' should be '/'`, () => {
        const result = combineRouterPath('/','/');
        const expected = '/';
        expect(expected).toBe(result);
    });

    it(`path: 'a' & 'b' should be '/a/b'`, () => {
        const result = combineRouterPath('a','b');
        const expected = '/a/b';
        expect(expected).toBe(result);
    });

    it(`path: '/a' & 'b' should be '/a/b'`, () => {
        const result = combineRouterPath('/a','b');
        const expected = '/a/b';
        expect(expected).toBe(result);
    });

    it(`path: 'a' & '/b' should be '/a/b'`, () => {
        const result = combineRouterPath('a','/b');
        const expected = '/a/b';
        expect(expected).toBe(result);
    });

    it(`path: '/a' & '/b' should be '/a/b'`, () => {
        const result = combineRouterPath('/a','/b');
        const expected = '/a/b';
        expect(expected).toBe(result);
    });


});