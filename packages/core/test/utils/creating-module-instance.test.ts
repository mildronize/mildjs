import { Controller, Get, Module, createModuleInstance } from '../../src';

@Module({

})
class MyModule{
    constructor(){}
}

describe('createModuleInstance', () => {

    it('The module should be defined', () => {
        const module = createModuleInstance(MyModule);
        expect(module).toBeDefined();
    });

});

