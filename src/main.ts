export interface RollValueCount {
    rollValue: number;
    repetitionCount: number;
}

const BRELAN = {
    point: 28,
    repetitionCount: 3,
}

const CARRE = {
    point: 35,
    repetitionCount: 4,
}

const FIGURES = [
    BRELAN, CARRE,
]

export const checkRollsValidity = (rolls: number[]) => {
    if (!Array.isArray(rolls) || rolls.length !== 5) {
        throw new Error('You must provide 5 rolls');
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

    for (const figure of FIGURES) {
        const figureRoll = rollsByRepetition.find(rollValueCount => rollValueCount.repetitionCount === figure.repetitionCount);
        if (figureRoll) {
            return figure.point;
        }
    }

    return 0;
}