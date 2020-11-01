import { httpMethodDecorator } from './utils';

export const Get = (path: string): MethodDecorator => httpMethodDecorator('get', { path });
export const Post = (path: string): MethodDecorator => httpMethodDecorator('post', { path });
export const Put = (path: string): MethodDecorator => httpMethodDecorator('put', { path });
export const Delete = (path: string): MethodDecorator => httpMethodDecorator('delete', { path });