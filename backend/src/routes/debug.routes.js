const express = require("express");
const router = express.Router();
const { readData } = require("../utils/fileDB");

router.get("/all", (req, res) => {
    res.json({
        coverage: readData("coverage.json"),
        grids: readData("grids.json"),
    });
});

module.exports = router;