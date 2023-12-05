export interface RollValueCount {
    rollValue: number;
    repetitionCount: number;
}

export interface Figure {
    point: number;
    isFigure: (rollCounts: RollValueCount[]) => boolean;
}

const BRELAN_REPETITION_COUNT = 3;
const BRELAN: Figure = {
    point: 28,
    isFigure: (rollCounts: RollValueCount[]) => {
        return rollCounts.some(rollCount => rollCount.repetitionCount === BRELAN_REPETITION_COUNT);
    },
}

const CARRE_REPETITION_COUNT = 4;
const CARRE: Figure = {
    point: 35,
    isFigure: (rollCounts: RollValueCount[]) => {
        return rollCounts.some(rollCount => rollCount.repetitionCount === CARRE_REPETITION_COUNT);
    },
}

const YAMS_REPETITION_COUNT = 5;
const YAMS: Figure = {
    point: 50,
    isFigure: (rollCounts: RollValueCount[]) => {
        return rollCounts.every(rollCount => rollCount.repetitionCount === YAMS_REPETITION_COUNT);
    },
}

const DOUBLE_REPETITION_COUNT = 2;
const FULL: Figure = {
    point: 30,
    isFigure: (rollCounts: RollValueCount[]) => {
        return rollCounts.some(rollCount => rollCount.repetitionCount === BRELAN_REPETITION_COUNT) && rollCounts.some(rollCount => rollCount.repetitionCount === DOUBLE_REPETITION_COUNT);
    }
}

const SUITE: Figure = {
    point: 40,
    isFigure: (rollCounts: RollValueCount[]) => {
        if (rollCounts.length !== NUMBER_OF_ROLLS) {
            return false;
        }

        const rollValues = rollCounts.map(rollCount => rollCount.rollValue).sort();
        while (rollValues.length > 1) {
            const previousRollValue = rollValues.shift();
            const nextRollValue = rollValues[0];
            if (previousRollValue !== undefined && nextRollValue != undefined && nextRollValue - previousRollValue !== 1) {
                return false;
            }
        }

        return true
    }
}

export const FIGURES: Figure[] = [
    BRELAN, CARRE, YAMS, FULL, SUITE
]

const NUMBER_OF_ROLLS = 5;

export const checkRollsValidity = (rolls: number[]) => {
    if (!Array.isArray(rolls) || rolls.length !== NUMBER_OF_ROLLS) {
        throw new Error('You must provide ' + NUMBER_OF_ROLLS + ' rolls');
    }
};

export const getRollByRepetition = (rolls: number[]): RollValueCount[] => {
    checkRollsValidity(rolls);

    const rollCounts: RollValueCount[] = []

    for (const roll of rolls) {
        const addedRollCount = rollCounts.find(rollValueCount => rollValueCount.rollValue === roll);
        if (!addedRollCount) {
            rollCounts.push({
                rollValue: roll,
                repetitionCount: 1,
            })
        } else {
            addedRollCount.repetitionCount = addedRollCount.repetitionCount + 1;
        }
    }

    return rollCounts;
}

export const getPointsForRolls = (rolls: number[]): number => {
    checkRollsValidity(rolls);

    const rollsByRepetition = getRollByRepetition(rolls);

    for (const figure of getFiguresOrderedByPoints()) {
        if (figure.isFigure(rollsByRepetition)) {
            return figure.point;
        }
    }

    // if no figure, return total points
    return rolls.reduce((total, rollValue) => total + rollValue, 0);
}

export const getPointsForLaunches = (launches: number[][]): number => {
    let points = 0;

    for (const rolls of launches) {
        points = points + getPointsForRolls(rolls);
    }

    return points;
}

export const getFiguresOrderedByPoints = (): Figure[] => {
    return FIGURES.sort((previousFigure, nextFigure) => nextFigure.point - previousFigure.point);
}