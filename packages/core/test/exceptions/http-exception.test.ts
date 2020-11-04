import { HttpException } from '../../src';

test('Setup the empty module', () => {
    const result = new HttpException(200, "error");
    const expected = {
        code: 200,
        message: "error"
    }
    expect(result.code).toBe(expected.code);
    expect(result.message).toBe(expected.message);
});