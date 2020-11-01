# Route Controller

[![Build Status](https://travis-ci.org/mildronize/route-controller.svg?branch=main)](https://travis-ci.org/mildronize/route-controller)

**A simple Express decorator for router**.
The idea is just merge the controller and route files together. So, we can just only the controller and add controller. 

** Alternatively: [routing-controllers](https://github.com/typestack/routing-controllers)

## Features

- Express Router decorators: `Get`, `Post`, `Put`, `Delete`, `Middleware`, `Controller`
- Basic `HttpException`
- Basic middleware for validating the request, `validateType`
- built-in [http-status-codes](https://github.com/prettymuchbryce/http-status-codes)


## Installation

1. Install the module

```bash
npm install route-controller reflect-metadata
```

## Usage

```
Note: for version 0.0.14
```

1. setup the controller

    ```typescript
    import { Controller, Get } from 'route-controller';

    @Controller('/users')
    export class UsersController {

        @Get('/')
        public async getUsers(req: any, res: any, next: any) {
            const data:any = { name: "Micky" };
            res.status(200).json({ data });
        }

    }
    ```
2. Setup the module

    ```typescript
    import { Module } from 'route-controller';
    import { UsersController } from './users.controller';

    @Module({
        controllers: [UsersController],
        providers: []
    })
    export class UserModule { }
    ```



3. Inject the module to Express using `useExpressServer`

    ```typescript
    import express from 'express';
    import { UserModule } from './users.module';

    app = express();
    useExpressServer(app, [
        UserModule
    ]);
    ```


## Q&A 

1. Why we don't need to catch the error in the controller?

    **Answer**: `addExpressController` and the router decorator. It works because `reflect-metadata` for using  save the extra the data to the function, class , method or property.

    If you see the code...

    ```typescript
    @Get('/')    // get method and path `/`
    public async getUsers(req: any, res: any, next: any) {
        const data: User[] = await this.userService.findAllUser();
        res.status(200).json({ data });
    }
    ```

    It will be transform to 

    ```typescript
    app.get('/', getUsers);
    ```

    but we don't handle the error yet, thanks for https://www.positronx.io/express-js-error-handling-tutorial-with-best-example/
    for example of using Express error handling.

    Lastly, it it will be

    ```typescript
    const asyncHelper = (fn: any) => (
        function(req: Request, res: Response, next: NextFunction){
            fn(req, res, next).catch(next);
        }
    );

    app.get('/', asyncHelper( async (req, res, next ) => {
        getUsers
    }) );
    ```

    So, the `asyncHelper` will help to catch the error, and pass it to the error handling middle of Express app.

    Finally, the error will be passing to the error handling middle of Express app. 

    ```typescript
    aap.use( (error, req, res, next ) => {
        res.send(error.message);
    })
    ```
