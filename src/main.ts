const BRELAN = {
    point: 28,
    repetitionCount: 3,
}

export const getPointsForRoll = (rolls: number[]) => {
    if (!Array.isArray(rolls) || rolls.length !== 5) {
        throw new Error('You must provide 5 rolls');
    }

    const numberOf2 = rolls.filter(roll => roll === 2).length;
    if (numberOf2 === BRELAN.repetitionCount) {
        return BRELAN.point;
    }
}

module.exports = {
    getPointsForRoll
};