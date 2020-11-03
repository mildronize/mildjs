import { responseFormat } from '../src';
import { Response } from 'express';
import { deepEqual } from './helper';

interface ObjectKeyString {
    [key: string]: any;
  }
  
const mockResponse = () => {
    const res : Response = {} as Response;
    res.status = () => res;
    res.json = () => res;
    return res;
  };
 
test('Test empty option responseFormat', () => {
    const result = responseFormat(mockResponse(), {});
    const expected = {
        status: 'success'
    };
    expect(deepEqual(result, expected)).toBe(true);
});

test('Test with `data` option responseFormat', () => {
    const result = responseFormat(mockResponse(), {
        data: 'test'
    });
    const expected = {
        data: 'test',
        status: 'success'
    };
    expect(deepEqual(result, expected)).toBe(true);
});

test('Test with `message` option responseFormat', () => {
    const result = responseFormat(mockResponse(), {
        message: 'test message'
    });
    const expected = {
        message: 'test message',
        status: 'success'
    };
    expect(deepEqual(result, expected)).toBe(true);
});

test('Test with all options option responseFormat', () => {
    const result = responseFormat(mockResponse(), {
        message: 'test message',
        data: 'test data'
    });
    const expected = {
        message: 'test message',
        data: 'test data',
        status: 'success'
    };
    expect(deepEqual(result, expected)).toBe(true);
});

// No test for status code ;)
