import { Request, Response, NextFunction } from 'express';

export const asyncHelper = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
};

export function createProviders(providers: any[]) {
    return providers.map(provider => new provider());
}

export function injectDependencies(controller: any, i: any[]): any {
    switch (i.length) {
        case 0: return new controller();
        case 1: return new controller(i[0]);
        case 2: return new controller(i[0], i[1]);
        case 3: return new controller(i[0], i[1], i[2]);
        case 4: return new controller(i[0], i[1], i[2], i[3]);
    }
    console.log('The max number of providers is 4');
    return null;
}

