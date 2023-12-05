import {
    getPointsForRolls,
    getRollByRepetition,
    checkRollsValidity,
    getFiguresOrderedByPoints,
    getPointsForLaunches, FIGURES
} from "./main";

const brelan = [1, 2, 3, 2, 2];
const brelanPoints = 28;
const carre = [1, 2, 2, 2, 2];
const carrePoints = 35;
const yams = [2, 2, 2, 2, 2];
const yamsPoints = 50;
const suite = [1, 2, 3, 4, 5];
const suitePoints = 40;

describe('init test', () => {
    it('should test', () => {
        expect(true).toBe(true);
    });
});

describe('Yams Figures', () => {
   it('brelan isFigure should return true if there is a brelan', () => {
         const rollCounts = getRollByRepetition(brelan);
         expect(FIGURES[0].isFigure(rollCounts)).toBe(true);
   });

    it('brelan isFigure should return false if there is no brelan', () => {
        const rollCounts = getRollByRepetition([1, 2, 3, 4, 5]);
        expect(FIGURES[0].isFigure(rollCounts)).toBe(false);
    });

    it('carre isFigure should return true if there is a carre', () => {
        const rollCounts = getRollByRepetition(carre);
        expect(FIGURES[1].isFigure(rollCounts)).toBe(true);
    });

    it('carre isFigure should return false if there is no carre', () => {
        const rollCounts = getRollByRepetition([1, 2, 3, 4, 5]);
        expect(FIGURES[1].isFigure(rollCounts)).toBe(false);
    });

    it('yams isFigure should return true if there is a yams', () => {
        const rollCounts = getRollByRepetition(yams);
        expect(FIGURES[2].isFigure(rollCounts)).toBe(true);
    });

    it('yams isFigure should return false if there is no yams', () => {
        const rollCounts = getRollByRepetition([1, 2, 3, 4, 5]);
        expect(FIGURES[2].isFigure(rollCounts)).toBe(false);
    });

    it('full isFigure should return true if there is a full', () => {
        const rollCounts = getRollByRepetition([1, 1, 1, 2, 2]);
        expect(FIGURES[3].isFigure(rollCounts)).toBe(true);
    });

    it('full isFigure should return false if there is no full', () => {
        const rollCounts = getRollByRepetition([1, 2, 3, 4, 5]);
        expect(FIGURES[3].isFigure(rollCounts)).toBe(false);
    });

    it('suite isFigure should return true if there is a suite', () => {
        const rollCounts = getRollByRepetition(suite);
        expect(FIGURES[4].isFigure(rollCounts)).toBe(true);
    });

    it('suite isFigure should return false if there is no suite', () => {
        const rollCounts = getRollByRepetition([1, 2, 3, 4, 6]);
        expect(FIGURES[4].isFigure(rollCounts)).toBe(false);
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
        const points = getPointsForRolls(brelan);
        expect(points).toBe(brelanPoints);
    });

    it('should return 28 points if there is a brelan of 4', () => {
        const points = getPointsForRolls([1, 4, 3, 4, 4]);
        expect(points).toBe(brelanPoints);
    });

    it('should return total points if there is no figure', () => {
        const roll = [1, 4, 3, 2, 4];
        const points = getPointsForRolls(roll);
        const chanceTotalPoints = roll.reduce((acc, point) => acc + point, 0);
        expect(points).toBe(chanceTotalPoints);
    });

    it('should return 35 points if there is a carre', () => {
        const points = getPointsForRolls(carre);
        expect(points).toBe(carrePoints);
    });

    it('should return 50 if there is a yams', () => {
        const points = getPointsForRolls(yams);
        expect(points).toBe(yamsPoints);
    });

    it('if brelan or carre, return one with the highest value', () => {
        const points = getPointsForRolls([1, 1, 1, 1, 2]);
        expect(points).toBe(carrePoints);
    });

    it('if brelan and double, it is a full, return 30', () => {
        const points = getPointsForRolls([1, 1, 1, 2, 2]);
        expect(points).toBe(30);
    });

    it('if suite, return 40', () => {
        const points = getPointsForRolls(suite);
        expect(points).toBe(suitePoints);
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
        expect(figures).toEqual(FIGURES.sort((a, b) => b.point - a.point));
    });
});

describe('Yams getPointsForRolls', () => {
    it('should return 28+35+50+28+30', () => {
        const points = getPointsForLaunches([
            [1, 2, 3, 2, 2],
            [1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2],
            [1, 1, 3, 1, 2],
            [1, 1, 3, 3, 3],
        ]);
        expect(points).toBe(28 + 35 + 50 + 28 + 30);
    });

    it('should return total if no figure (using chance)', () => {
        const points = getPointsForLaunches([
            [1, 2, 3, 2, 3],
            [1, 2, 3, 2, 3],
            [1, 2, 3, 2, 3],
            [1, 2, 3, 2, 3],
            [1, 2, 3, 2, 3],
        ]);
        expect(points).toBe(5 * (1 + 2 + 3 + 2 + 3));
    });

    it('should return 139', () => {
        const points = getPointsForLaunches([
            brelan,
            yams,
            [2, 1, 2, 4, 6],
            carre,
            [1, 2, 3, 2, 3],
        ]);
        expect(points).toBe(28 + 50 + 15 + 35 + 11);
    });
});