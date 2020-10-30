import { addExpressController } from '../src';
import express from "express";

test('Setup the empty controller', () => {
    const app = express();
    const result = addExpressController(app, []);
    expect(result).toBe(true);
});