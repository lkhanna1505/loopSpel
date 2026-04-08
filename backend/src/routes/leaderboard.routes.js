const express = require("express");
const router = express.Router();
const { getGlobalLeaderboard } = require("../controllers/leaderboard.controller");

router.get("/global", getGlobalLeaderboard);

module.exports = router;