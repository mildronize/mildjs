import { isEmptyObject } from '../../src';

describe('Is empty object', () => {

    it('empty object should be true', () => {
        expect(isEmptyObject({})).toBe(true);
    });

    it('empty object should be true', () => {
        expect(isEmptyObject({
            name: 'mild'
        })).toBe(false);
    });
    
});
