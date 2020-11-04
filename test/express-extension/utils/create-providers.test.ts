import { ClassType } from 'class-transformer/ClassTransformer';
import Container, { Service } from 'typedi';
import { injectDependencies, createProviders } from '../../../src/express-extension/use-express-server';

class UserController {
    constructor(
        public arg1: UsersService,
        public arg2: AuthService
    ) { }
}

@Service()
class UsersService {
    info() { return "user" }
}

@Service()
class AuthService {
    info() { return "auth" }
}



describe('Inject Dependencies', () => {

    it('It should be empty list of providers', () => {
        const providerClasses: any[] = [];
        const providers: any[] = createProviders(providerClasses, Container) || [];
        expect(providers.length).toBe(0);
    });

    it('The service should be defined', () => {
        const providerClasses: any[] = [UsersService];
        const providers: any[] = createProviders(providerClasses, Container) || [];
        expect(providers.length).toBe(1);
        expect(providers[0]).toBeDefined();
    });

    it('The service should be defined', () => {
        const providerClasses: any[] = [UsersService];
        const providers: any[] = createProviders(providerClasses, Container) || [];
        expect(providers.length).toBe(1);
        expect(providers[0]).toBeDefined();

    });
    
    it('The service should be defined (2 services)', () => {
        const providerClasses: any[] = [UsersService, AuthService];
        const providers: any[] = createProviders(providerClasses, Container) || [];
        expect(providers.length).toBe(2);
        expect(providers[0]).toBeDefined();
    });

});