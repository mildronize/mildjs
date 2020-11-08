import { useExpressServer, InjectionToken, Get, Injectable, Module, DynamicModule } from '../../../../packages/core/src';

export const MockDataToken = new InjectionToken<string>('mock_data');

@Module({})
export class MockModule {
    // constructor(){}

    static forFeature(): DynamicModule {

        const dataProvider = {
            provide: MockDataToken,
            useValue: 'hey my mock',
        };

        return {
            // This module class
            module: MockModule,
            providers: [dataProvider]

        };
    }
}
