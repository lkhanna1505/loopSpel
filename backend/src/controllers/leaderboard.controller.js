const User = require("../models/User");

const getGlobalLeaderboard = async (req, res) => {
    try {
        const users = await User.find()
            .sort({ totalAreaCaptured: -1 })
            .limit(10)
            .select("name totalAreaCaptured");

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getGlobalLeaderboard };