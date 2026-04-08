const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");

// ✅ IMPORTANT: destructure properly
const {
    getFriendLeaderboard,
} = require("../controllers/leaderboard.controller");

router.get("/friends", protect, getFriendLeaderboard);

module.exports = router;