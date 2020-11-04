import { asyncHelper } from '../../../src/express-extension/use-express-server';

describe('asyncHelper', () => {

    it('the function should be called', () => {

        const mockFunction = jest.fn();
        const myFunc = (fn: any) => fn();

        asyncHelper(myFunc(mockFunction));
        expect(mockFunction).toBeCalled();
    });


});