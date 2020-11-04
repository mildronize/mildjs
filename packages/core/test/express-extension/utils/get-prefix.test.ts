import { getPrefix } from '../../../src/express-extension/use-express-server';


describe('getPrefix', () => {

    it('It should be empty', () => {
        const routes: any[] = [];
        const providers: string = getPrefix(routes);
        expect(providers).toBe('');
    });

    it('It should be getting path', () => {
        const routes: any[] = [{ isClass: true, path: '/' }];
        const providers: string = getPrefix(routes);
        expect(providers).toBe('/');
    });


});