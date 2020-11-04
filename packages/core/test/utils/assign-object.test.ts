import { assignObject } from '../../src';

describe('Is empty object', () => {

    it('empty object should be true', () => {
        expect(assignObject({}, {})).toStrictEqual({});
    });

    it('Assign an empty object into a object, it should be the original object', () => {
        const result = assignObject({ name: 'mild' }, {});
        expect(result).toStrictEqual({ name: 'mild' });
    });

    it('Assign an object into the empty object, it should be same with the source object', () => {
        const result = assignObject({}, { name: 'mild' });
        expect(result).toStrictEqual({ name: 'mild' });
    });

    it('Assign the object into the object, it should merge object', () => {
        const result = assignObject({test: 'test'}, { name: 'mild' });
        expect(result).toStrictEqual({ name: 'mild', test: 'test' });
    });
    
});
