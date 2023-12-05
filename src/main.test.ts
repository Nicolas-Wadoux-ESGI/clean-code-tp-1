import {testFunction} from "./main";

describe('Test initialisation', () => {
    it('should test', () => {
        expect(true).toBe(true);
    });

    it('should return Hello World!', () => {
        expect(testFunction()).toBe('Hello World!');
    });
});