export const getPointsForRoll = (rolls: number[]) => {
    if (!Array.isArray(rolls) || rolls.length !== 5) {
        throw new Error('You must provide 5 rolls');
    }

}

module.exports = {
    getPointsForRoll
};