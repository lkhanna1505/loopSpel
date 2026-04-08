const express = require("express");
const router = express.Router();
const { getViewportGrids } = require("../controllers/grid.controller");

router.get("/viewport", getViewportGrids);

module.exports = router;