const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    lat: Number,
    lng: Number,
    geohash: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Movement", schema);