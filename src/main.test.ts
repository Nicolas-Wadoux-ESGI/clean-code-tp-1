import {getPointsForRoll, getDiceValuesWithCount} from "./main";

const brelan = [1, 2, 3, 2, 2];

describe('init test', () => {
    it('should test', () => {
        expect(true).toBe(true);
    });
});

describe('Yams getPointsForRoll', () => {
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
});

describe('Yams getDiceValuesWithCount', () => {
    it('should return number of repetitions in the rolls', () => {
        const rolls = [1, 2, 3, 2, 2];
        const diceValuesWithCount = getDiceValuesWithCount(rolls);
        expect(diceValuesWithCount).toEqual([
            {
                rollValue: 1,
                repetitionCount: 1,
            },
            {
                rollValue: 2,
                repetitionCount: 3,
            },
            {
                rollValue: 3,
                repetitionCount: 1,
            },
        ]);
    });
});