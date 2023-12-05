import {
    getPointsForRoll,
    getRollByRepetition,
    checkRollsValidity,
    getFiguresOrderedByPoints,
    getPointsForRolls
} from "./main";

const brelan = [1, 2, 3, 2, 2];
const brelanPoints = 28;
const carre = [1, 2, 2, 2, 2];
const carrePoints = 35;
const yams = [2, 2, 2, 2, 2];
const yamsPoints = 50;

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
        expect(points).toBe(brelanPoints);
    });

    it('should return 28 points if there is a brelan of 4', () => {
        const points = getPointsForRoll([1, 4, 3, 4, 4]);
        expect(points).toBe(brelanPoints);
    });

    it('should return total points if there is no figure', () => {
        const roll = [1, 4, 3, 2, 4];
        const points = getPointsForRoll(roll);
        const chanceTotalPoints = roll.reduce((acc, point) => acc + point, 0);
        expect(points).toBe(chanceTotalPoints);
    });

    it('should return 35 points if there is a carre', () => {
        const points = getPointsForRoll(carre);
        expect(points).toBe(carrePoints);
    });

    it('should return 50 if there is a yams', () => {
        const points = getPointsForRoll(yams);
        expect(points).toBe(yamsPoints);
    });

    it('if brelan or carre, return one with the highest value', () => {
        const points = getPointsForRoll([1, 1, 1, 1, 2]);
        expect(points).toBe(carrePoints);
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

describe('Yams getFiguresOrderedByPoints', () => {
    it('should return figures ordered by points', () => {
        const figures = getFiguresOrderedByPoints();
        expect(figures).toEqual([
            {
                point: 50,
                repetitionCount: 5,
            },
            {
                point: 35,
                repetitionCount: 4,
            },
            {
                point: 28,
                repetitionCount: 3,
            },
        ]);
    });
});

describe('Yams getPointsForRolls', () => {
    it('should return 28+35+50+28+28', () => {
        const points = getPointsForRolls([
            [1, 2, 3, 2, 2],
            [1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2],
            [1, 1, 3, 1, 2],
            [1, 1, 3, 3, 3],
        ]);
        expect(points).toBe(28 + 35 + 50 + 28 + 28);
    });

    it('should return total if no figure (using chance)', () => {
        const points = getPointsForRolls([
            [1, 2, 3, 2, 3],
            [1, 2, 3, 2, 3],
            [1, 2, 3, 2, 3],
            [1, 2, 3, 2, 3],
            [1, 2, 3, 2, 3],
        ]);
        expect(points).toBe(5 * (1 + 2 + 3 + 2 + 3));
    });

    it('should return 139', () => {
        const points = getPointsForRolls([
            brelan,
            yams,
            [2, 1, 2, 4, 6],
            carre,
            [1, 2, 3, 2, 3],
        ]);
        expect(points).toBe(28 + 50 + 15 + 35 + 11);
    });
});