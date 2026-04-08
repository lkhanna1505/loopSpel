const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const { getMyTerritories } = require("../controllers/territory.controller");

router.get("/me", protect, getMyTerritories);

module.exports = router;