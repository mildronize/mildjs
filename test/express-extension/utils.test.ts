import { ClassType } from 'class-transformer/ClassTransformer';
import { injectDependencies, createProviders } from '../../src/express-extension/use-express-server';

class UserController {
    constructor(
        public arg1: UsersService,
        public arg2: AuthService
    ) { }
}

class UsersService {
    info() { return "user" }
}
class AuthService {
    info() { return "auth" }
}

// Mock container from Typedi

const mockCreateProviders = (providerClasses: any[]) => {
    return providerClasses.map((provider) => new provider());
}

test('Setup injectDependencies without providers', () => {
    const providerClasses: any[] = [];
    const providers: any[] = mockCreateProviders(providerClasses)
    const instance = injectDependencies(UserController, providers);
    expect(instance.arg1).toBe(undefined);
    expect(instance.arg2).toBe(undefined);
});


test('Setup injectDependencies with 2 providers', () => {
    const providerClasses: any[] = [UsersService, AuthService];
    const providers: any[] = mockCreateProviders(providerClasses)
    const instance = injectDependencies(UserController, providers);
    expect(instance.arg1.info()).toBe("user");
    expect(instance.arg2.info()).toBe("auth");
});

test('Setup injectDependencies with 2 providers (Missing order)', () => {
    const providerClasses: any[] = [AuthService, UsersService];
    const providers: any[] = mockCreateProviders(providerClasses)
    const instance = injectDependencies(UserController, providers);
    expect(instance.arg1.info()).toBe("auth");
    expect(instance.arg2.info()).toBe("user");
});

