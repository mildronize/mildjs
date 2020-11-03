import { responseFormat } from '../../src';
import { Response } from 'express';

const mockResponse = () => {
    const res : Response = {} as Response;
    res.status = () => res;
    res.json = () => res;
    return res;
  };

describe('Response Format', () => {

    it('Test empty option responseFormat', () => {
        const result = responseFormat(mockResponse(), {});
        const expected = {
            status: 'success'
        };
        expect(expected).toStrictEqual(result);
    });
    
    it('Test with `data` option responseFormat', () => {
        const result = responseFormat(mockResponse(), {
            data: 'test'
        });
        const expected = {
            data: 'test',
            status: 'success'
        };
        expect(expected).toStrictEqual(result);
    });
    
    it('Test with `message` option responseFormat', () => {
        const result = responseFormat(mockResponse(), {
            message: 'test message'
        });
        const expected = {
            message: 'test message',
            status: 'success'
        };
        expect(expected).toStrictEqual(result);
    });
    
    it('Test with all options option responseFormat', () => {
        const result = responseFormat(mockResponse(), {
            message: 'test message',
            data: 'test data'
        });
        const expected = {
            message: 'test message',
            data: 'test data',
            status: 'success'
        };
        expect(expected).toStrictEqual(result);
    });
});
 


// No test for status code ;)
