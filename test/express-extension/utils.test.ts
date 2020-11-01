import { injectDependencies, createProviders } from '../../src/express-extension/utils';

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

test('Setup injectDependencies without providers', () => {
    const providerClasses: any[] = [];
    const providers: any[] = createProviders(providerClasses)
    const instance = injectDependencies(UserController, providers);
    expect(instance.arg1).toBe(undefined);
    expect(instance.arg2).toBe(undefined);
});


test('Setup injectDependencies with 2 providers', () => {
    const providerClasses: any[] = [UsersService, AuthService];
    const providers: any[] = createProviders(providerClasses)
    const instance = injectDependencies(UserController, providers);
    expect(instance.arg1.info()).toBe("user");
    expect(instance.arg2.info()).toBe("auth");
});

test('Setup injectDependencies with 2 providers (Missing order)', () => {
    const providerClasses: any[] = [AuthService, UsersService];
    const providers: any[] = createProviders(providerClasses)
    const instance = injectDependencies(UserController, providers);
    expect(instance.arg1.info()).toBe("auth");
    expect(instance.arg2.info()).toBe("user");
});

// test('Setup injectDependencies with overload of arguments  (5 providers)', () => {
//     const providerClasses: any[] = [UsersService, UsersService, UsersService, UsersService, UsersService];
//     const providers: any[] = createProviders(providerClasses)
//     const instance = injectDependencies(UserController, providers);
//     expect(instance).toThrow(Error);
// });
