import { useExpressServer } from '../../src';
import express from "express";


test('Setup the empty module', () => {
    const app = express();
    const result = useExpressServer(app, []);
    expect(result).toBe(true);
});