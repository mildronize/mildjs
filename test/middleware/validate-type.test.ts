import { validateType, HttpException } from '../../src';
import { IsEmail, IsString } from 'class-validator';
import { mockRequest, mockResponse } from 'mock-req-res';
import { Request, Response } from 'express';

export class CreateUserDto {
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}


describe('Validate Type Middleware of Request body', () => {
    let res: Response;
    let next: any;

    beforeEach(async () => {
        res = mockResponse();
        next = jest.fn();
    });


    it('Correct type', async () => {

        const req = mockRequest({ 
            body: {
                email: "mild@email.com",
                password: "foo",
            }
        });
        await validateType(CreateUserDto)(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it('Correct type (Empty request)', async () => {
        const req = mockRequest();
        await validateType(CreateUserDto)(req, res, next);
        expect(next).toHaveBeenCalledWith(new HttpException(400, "email must be an email, password must be a string"));
    });

    it('Incorrect type', async () => {

        const req = mockRequest({
            body: {
                email: "mild@email.com",
                password: 123,
            }
        })

        await validateType(CreateUserDto)(req, res, next);
        expect(next).toHaveBeenCalledWith(new HttpException(400, "password must be a string"));
    });

    it('Correct type with skipMissingProperties = true', async () => {

        const req = mockRequest({
            body: {
                email: "mild@email.com",
            }
        })

        await validateType(CreateUserDto, true)(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it('Incorrect type with skipMissingProperties = true', async () => {

        const req = mockRequest({
            body: {
                email: 555,
            }
        })

        await validateType(CreateUserDto, true)(req, res, next);
        expect(next).toHaveBeenCalledWith(new HttpException(400, "email must be an email"));
    });

});

