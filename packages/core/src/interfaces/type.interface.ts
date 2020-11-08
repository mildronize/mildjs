/**
 *  The type which the class needs a constructor in its definition through this
 *
 *  An example of a `Type` is `MyController` class, which in JavaScript is be represented by
 *  the `MyController` constructor function.
 */

export interface Type<T> extends Function {
  // tslint:disable-next-line:callable-types
  new (...args: any[]): T;
}
