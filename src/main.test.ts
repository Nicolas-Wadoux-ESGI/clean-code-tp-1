import {getPointsForRoll, getRollByRepetition, checkRollsValidity} from "./main";

const brelan = [1, 2, 3, 2, 2];

describe('init test', () => {
    it('should test', () => {
        expect(true).toBe(true);
    });
});

describe('Yams checkRollsValidity', () => {
    it('should throw an error if there is less than 5 rolls provided', () => {
        expect(() => {
            checkRollsValidity([1, 2, 3, 2]);
        }).toThrowError('You must provide 5 rolls');
    });

    it('should throw an error if there is more than 5 rolls provided', () => {
        expect(() => {
            checkRollsValidity([1, 2, 3, 2, 2, 2]);
        }).toThrowError('You must provide 5 rolls');
    });
});

describe('Yams getPointsForRoll', () => {
    it('should return 28 points if there is a brelan of 2', () => {
        const points = getPointsForRoll(brelan);
        expect(points).toBe(28);
    });

    it('should return 0 points if there is a brelan of 4', () => {
        const points = getPointsForRoll([1, 4, 3, 4, 4]);
        expect(points).toBe(28);
    });

    it('should return 0 points if there is no brelan', () => {
        const points = getPointsForRoll([1, 2, 3, 4, 5]);
        expect(points).toBe(0);
    });
});

describe('Yams getRollByRepetition', () => {
    it('should return number of repetitions in the rolls', () => {
        const rolls = [1, 2, 3, 2, 2];
        const diceValuesWithCount = getRollByRepetition(rolls);
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