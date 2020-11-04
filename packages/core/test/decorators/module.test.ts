import { Module } from '../../src';

@Module({
    controllers: []
})
class MyModule { }

test('@Module decorator: empty controller', () => {
    const expectedModuleMetadata = Reflect.getMetadata('module', MyModule);;
    expect(expectedModuleMetadata).toStrictEqual({ controllers: [] });
});

@Module({
    controllers: [],
    providers: []
})
class MyModuleProvider { }

test('@Module decorator: empty controller & provider', () => {
    const expectedModuleMetadata = Reflect.getMetadata('module', MyModuleProvider);;
    expect(expectedModuleMetadata).toStrictEqual({ controllers: [] , providers: []});
});

