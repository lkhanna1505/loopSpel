const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        geohash: String,
        distanceCovered: {
            type: Number,
            default: 0,
        },
        coveragePercent: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

schema.index({ userId: 1, geohash: 1 }, { unique: true });

module.exports = mongoose.model("UserGridCoverage", schema);