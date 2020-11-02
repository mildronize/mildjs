import { HttpException } from '../../src';


function shallowEqual(object1: any, object2:any) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
  
    return true;
  }

test('Setup the empty module', () => {
    const result = new HttpException(200, "error");
    const expected = {
        code: 200,
        message: "error"
    }
    expect(result.code).toBe(expected.code);
    expect(result.message).toBe(expected.message);
});