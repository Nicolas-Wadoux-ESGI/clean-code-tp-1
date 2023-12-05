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

    it('should return 28 if there is a brelan of 2', () => {
        expect(getPointsForRoll(brelan)).toBe(28);
    });
    it('should return 28 if there is a brelan of 3', () => {
        expect(getPointsForRoll([1, 2, 3, 3, 3])).toBe(28);
    });
    it('should return 28 if there is a brelan of 4', () => {
        expect(getPointsForRoll([1, 4, 3, 4, 4])).toBe(28);
    });
});