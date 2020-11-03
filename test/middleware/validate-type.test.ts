import {validateType} from '../../src';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

test('Validate ', () => {

    const req = {
        body: {
            email: "mild@gmail.com",
            password: 1,
        }
    };

    const next = jest.fn();

    // const a = validateType(CreateUserDto) => 
    // const f = (req:any, {}, next:any) => validateType(CreateUserDto);

    // validateSchema(req, {}, next);
    // f(req, {}, next);

    // expect(next).toBeCalled();
});

