const { readData } = require("../utils/fileDB");

const calculateLeaderboard = (userIds) => {
    const coverage = readData("coverage.json");

    const scores = {};

    coverage.forEach((c) => {
        if (!userIds || userIds.includes(c.userId)) {
            if (!scores[c.userId]) scores[c.userId] = 0;
            scores[c.userId] += 1;
        }
    });

    return Object.entries(scores)
        .map(([userId, grids]) => ({ userId, grids }))
        .sort((a, b) => b.grids - a.grids);
};

module.exports = { calculateLeaderboard };