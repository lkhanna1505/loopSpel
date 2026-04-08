const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const {
    addFriend,
    getFriends,
} = require("../controllers/friend.controller");

router.post("/add", protect, addFriend);
router.get("/", protect, getFriends);

module.exports = router;