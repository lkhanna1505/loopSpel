// const User = require("../models/User");

// const getGlobalLeaderboard = async (req, res) => {
//     try {
//         const users = await User.find()
//             .sort({ totalAreaCaptured: -1 })
//             .limit(10)
//             .select("name totalAreaCaptured");

//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = { getGlobalLeaderboard };

//updating friends system in leaderboard.js

const { readData } = require("../utils/fileDB");

const getFriendLeaderboard = (req, res) => {
    const userId = req.user;

    const friends = readData("friends.json");
    const coverage = readData("coverage.json");

    const myFriends = friends
        .filter((f) => f.userId === userId)
        .map((f) => f.friendId);

    const scores = {};

    coverage.forEach((c) => {
        if (myFriends.includes(c.userId)) {
            if (!scores[c.userId]) scores[c.userId] = 0;
            scores[c.userId] += 1;
        }
    });

    const leaderboard = Object.entries(scores)
        .map(([userId, score]) => ({
            userId,
            grids: score,
        }))
        .sort((a, b) => b.grids - a.grids);

    res.json(leaderboard);
};

module.exports = { getFriendLeaderboard };