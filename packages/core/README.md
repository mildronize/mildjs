# MildJS

[![Build Status](https://travis-ci.org/mildronize/mildjs.svg?branch=main)](https://travis-ci.org/mildronize/mildjs) [![codecov](https://codecov.io/gh/mildronize/mildjs/branch/main/graph/badge.svg?token=ELlWnSm2Jb)](https://codecov.io/gh/mildronize/mildjs) [![npm version](https://badge.fury.io/js/%40mildjs%2Fcore.svg)](https://badge.fury.io/js/%40mildjs%2Fcore)

A **simple library** for creating structured and organized controllers and services with class-based design. It also provides basic decorators usage in **Express** using Typescript

**Philosophy**: Provide tools for creating lightweight framework for Express app. To be easy to integrate with any kind of dependency injection tools, any service providers.

However, it focus on low dependency as much as possible. The tools should help to define the stucture of code for testing purpose, but also flexible for add other tools.

**Inspiration from:**  [Nestjs](https://nestjs.com/), [Routing Controllers](https://github.com/typestack/routing-controllers), [OvernightJS](https://github.com/seanpmaxwell/overnight)

----

## Features

- Express Router decorators: `Get`, `Post`, `Put`, `Delete`, `Use`, `Controller`
- Express Middleware
  - `Use` for Express Middleware
  - Support multiple middleware, e.g. `@Use(validateAuth, validateRole)` (`validateAuth`, `validateRole` is the custom middlewares)
- Basic `HttpException`
- Basic middleware for validating the request, `validateType` using `class-validator`
- built-in [http-status-codes](https://github.com/prettymuchbryce/http-status-codes)


## Installation

Install the module

```bash
$ npm install @mildjs/core reflect-metadata
```

## Usage

The concept is `Module` contains:

- `Controller`: Combine the controller, middleware and routing
- `Service`: To connect with other service like Database.

```
Note: for version 1.5.0
```

1. Setup the controller

    ```typescript
    // filename: users.controller.ts
    import { Controller, Get } from '@mildjs/core';

    @Controller('users')
    export class UsersController {

        @Get()
        public async getUsers(req: any, res: any, next: any) {
            const data:any = { name: "Micky" };
            res.status(200).json( data );
        }

    }
    ```

2. Inject the controller to Express using `useExpressServer`

    ```typescript
    // filename: main.ts
    import express from 'express';
    import { UsersController } from './users.controller';
    import { useExpressServer } from '@mildjs/core';

    const app = express();
    useExpressServer(app, {
        controllers: [UsersController]
    });
    app.listen(3000);
    ```

## The example usage with TypeORM & TypeDI

If you want to use with TypeORM, please install

```bash
$ npm install typeorm typedi typeorm-typedi-extensions
```

1. setup the entity & service

    ```typescript
    // filename: users.entity.ts
    import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

    @Entity()
    export class User {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        name: string;
    }
    ```

    The `repository` will be injected by service of `typedi`

    ```typescript
    // filename: users.service.ts
    import { Service } from 'typedi';
    import { InjectRepository } from 'typeorm-typedi-extensions';
    import { User} from './users.entity';

    @Service()
    export class UsersService {

        @InjectRepository(User)
        private repository: Repository<User>;

        public findAll(): Promise<User[]> {
            const users = this.repository.find();
            return users;
        }
    }
    ```



2. setup the controller, (Note: `useExpressServer` will inject the service in `userService` property, respectively, If you have 2 services, please make sure that the order in the providers (@Module) is setting is same order with the controller constructor. )

    ```typescript
    // filename: users.controller.ts
    import { Controller, Get } from '@mildjs/core';
    import { UsersService } from './users.service';
    import { User} from 'users.entity';

    @Controller('/users')
    export class UsersController {

        constructor(public userService: UsersService) {}

        @Get('/')
        public async getUsers(req: any, res: any, next: any) {
            const data: User[] = await this.userService.findAll();
            res.status(200).json({ data });
        }
    }
    ```

3. Setup the module

    ```typescript
    // filename: users.module.ts
    import { Module } from '@mildjs/core';
    import { UsersController } from './users.controller';
    import { UsersService } from './users.service';

    @Module({
        controllers: [ UsersController ],
        providers: [ UsersService ]
    })
    export class UsersModule { }
    ```

4. setup the express app & typeORM connect with the DB

    ```typescript
    // main.ts
    import express from 'express';
    import { UsersModule } from './users.module';
    import { Container } from 'typedi';
    import { createConnection, useContainer } from 'typeorm';

    function initDatabase(){
        useContainer(Container);
        createConnection({
            // TypeORM config....
        });
    }

    async function runServer(){
        // Make sure the database should be connected before inject the providers
        await initDatabase();
        app = express();

        useExpressServer(app, {
            // import module
            imports: [ UsersModule ]
            // inject the container from `createConnection`
            getProviderCallback: (provider: any) => Container.get(provider);
        });
    }

    runServer();
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
    app.use( (error, req, res, next ) => {
        res.send(error.message);
    })
    ```

## Thanks

- [postpublish script by muffinman.io](https://muffinman.io/add-git-version-tag-after-publishing-to-npm/)

## Pull Request

Fine, you can help to improve this project

## License

MIT
