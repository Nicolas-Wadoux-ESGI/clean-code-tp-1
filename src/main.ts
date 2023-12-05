export interface RollValueCount {
    rollValue: number;
    repetitionCount: number;
}

const BRELAN = {
    point: 28,
    repetitionCount: 3,
}

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
    const hasBrelanInRolls = rollsByRepetition.some(rollByRepetition => rollByRepetition.repetitionCount === BRELAN.repetitionCount);
    if (hasBrelanInRolls) {
        return BRELAN.point;
    }

    return 0;
}