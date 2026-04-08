const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    geohash: {
        type: String,
        unique: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    ownerCoverage: {
        type: Number,
        default: 0,
    },
    lastCapturedAt: Date,
});

module.exports = mongoose.model("Grid", schema);