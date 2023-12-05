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

export const getDiceValuesWithCount = (rolls: number[]): RollValueCount[] => {
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

export const getPointsForRoll = (rolls: number[]) => {
    checkRollsValidity(rolls);

    const numberOf2 = rolls.filter(roll => roll === 2).length;
    if (numberOf2 === BRELAN.repetitionCount) {
        return BRELAN.point;
    }

}