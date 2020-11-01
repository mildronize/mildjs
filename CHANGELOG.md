# Changelog 

## Decoratos

- Http Method & Middleware can swapable [(commit)](https://github.com/mildronize/route-controller/commit/632fbddfc97dbf8f011f6f746a9183b7ff4efc74) 
    

    ```typescript
    @Get('/')
    @Middleware(validate) 
    ```

    or 

    ```typescript
    @Middleware(validate) 
    @Get('/')
    ```

    