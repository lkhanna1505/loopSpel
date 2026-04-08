const express = require("express");
const router = express.Router();
const { processBatch } = require("../controllers/movement.controller");
const protect = require("../middlewares/auth.middleware");

router.post("/batch", protect, processBatch);

module.exports = router;