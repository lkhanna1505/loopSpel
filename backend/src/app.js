const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const healthRoutes = require("./routes/health.routes");
app.use("/api/health", healthRoutes);

module.exports = app;