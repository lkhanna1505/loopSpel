const express = require("express");
const router = express.Router();
const { healthCheck } = require("../controllers/health.controller");

router.get("/", healthCheck);

//after auth

const protect = require("../middlewares/auth.middleware");

router.get("/private", protect, (req, res) => {
    res.json({
        message: "Protected route working",
        userId: req.user,
    });
});

module.exports = router;