export interface RollValueCount {
    rollValue: number;
    repetitionCount: number;
}

export interface Figure {
    point: number;
    repetitionCount: number;
}

const BRELAN: Figure = {
    point: 28,
    repetitionCount: 3,
}

const CARRE: Figure = {
    point: 35,
    repetitionCount: 4,
}

const YAMS: Figure = {
    point: 50,
    repetitionCount: 5,
}

const FIGURES: Figure[] = [
    BRELAN, CARRE, YAMS,
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

export const getPointsForRoll = (rolls: number[]): number => {
    checkRollsValidity(rolls);

    const rollsByRepetition = getRollByRepetition(rolls);

    for (const figure of getFiguresOrderedByPoints()) {
        const figureRoll = rollsByRepetition.find(rollValueCount => rollValueCount.repetitionCount === figure.repetitionCount);
        if (figureRoll) {
            return figure.point;
        }
    }

    return 0;
}

export const getFiguresOrderedByPoints = (): Figure[] => {
    return FIGURES.sort((previousFigure, nextFigure) => nextFigure.point - previousFigure.point);
}