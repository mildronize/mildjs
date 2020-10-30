import { httpMethodDecorator } from './utils';

export const Get = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return httpMethodDecorator('get', { path });
};

export const Post = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return httpMethodDecorator('post', { path });
};

export const Put = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return httpMethodDecorator('put', { path });
};

export const Delete = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return httpMethodDecorator('delete', { path });
};
