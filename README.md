# MildJS

<br/>

## Moved repo to [mildjs/mild](https://github.com/mildjs/mild)

<br/><br/><br/>

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
