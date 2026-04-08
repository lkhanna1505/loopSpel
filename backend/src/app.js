const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const healthRoutes = require("./routes/health.routes");
app.use("/api/health", healthRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// grid calculation and storing data
const movementRoutes = require("./routes/movement.routes");
app.use("/api/movement", movementRoutes);

//territory routes
const territoryRoutes = require("./routes/territory.routes");
app.use("/api/territories", territoryRoutes);

//grid
const gridRoutes = require("./routes/grid.routes");
app.use("/api/grids", gridRoutes);

//leadrboard
const leaderboardRoutes = require("./routes/leaderboard.routes");
app.use("/api/leaderboard", leaderboardRoutes);

//debug routes to see all data
const debugRoutes = require("./routes/debug.routes");
app.use("/api/debug", debugRoutes);

//friend routes
const friendRoutes = require("./routes/friend.routes");
// console.log("TYPE:", typeof getFriendLeaderboard);
app.use("/api/friends", friendRoutes);

//friends
const activityRoutes = require("./routes/activity.routes");
app.use("/api/activity", activityRoutes);

//leaderboard
const { getFriendLeaderboard } = require("./controllers/leaderboard.controller");
// router.get("/friends", protect, getFriendLeaderboard);
app.use("/api/leaderboard", leaderboardRoutes);

module.exports = app;