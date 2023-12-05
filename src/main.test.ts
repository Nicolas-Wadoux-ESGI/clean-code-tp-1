import {getPointsForRoll} from "./main";

const brelan = [1, 2, 3, 2, 2];

describe('Yams', () => {
    it('should test', () => {
        expect(true).toBe(true);
    });

    it('should throw an error if there is less than 5 rolls provided', () => {
        expect(() => {
            getPointsForRoll([1, 2, 3, 2]);
        }).toThrowError('You must provide 5 rolls');
    });

    it('should throw an error if there is more than 5 rolls provided', () => {
        expect(() => {
            getPointsForRoll([1, 2, 3, 2, 2, 2]);
        }).toThrowError('You must provide 5 rolls');
    });

    it('shoudl return 28 if there is a brelan of 2', () => {
        expect(getPointsForRoll(brelan)).toBe(28);
    });
});