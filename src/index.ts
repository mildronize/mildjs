import 'reflect-metadata';
export * from './decorator.interface';

export * from './decorators/controller';
export * from './decorators/http-methods';
export * from './decorators/middleware';
export * from './decorators/utils';

export * from './add-express-controller';

export * from './exceptions/HTTPException';

// Export all HTTP status codes from `http-status-codes` package.
// Based on the Java Apache HttpStatus API. (http://hc.apache.org/httpclient-3.x/apidocs/org/apache/commons/httpclient/HttpStatus.html)

export * from 'http-status-codes';

// thanks router decorator from https://nehalist.io/routing-with-typescript-decorators/
