// const UserGridCoverage = require("../models/UserGridCoverage");
// const User = require("../models/User");
// const Grid = require("../models/Grid");
// const {
//     MAX_DISTANCE_FOR_FULL_COVERAGE,
//     CAPTURE_THRESHOLD,
// } = require("../utils/constants");

// const updateCoverage = async (userId, geohash, distance) => {
//     let record = await UserGridCoverage.findOne({ userId, geohash });

//     if (!record) {
//         record = await UserGridCoverage.create({
//             userId,
//             geohash,
//         });
//     }

//     record.distanceCovered += distance;

//     record.coveragePercent = Math.min(
//         record.distanceCovered / MAX_DISTANCE_FOR_FULL_COVERAGE,
//         1
//     );

//     await record.save();

//     // Capture logic
//     if (record.coveragePercent >= CAPTURE_THRESHOLD) {
//         let grid = await Grid.findOne({ geohash });

//         if (!grid) {
//             grid = await Grid.create({ geohash });
//         }

//         // if (!grid.ownerId || record.coveragePercent > grid.ownerCoverage) {
//         //     grid.ownerId = userId;
//         //     grid.ownerCoverage = record.coveragePercent;
//         //     grid.lastCapturedAt = new Date();

//         //     await grid.save();
//         // }
//         if (!grid.ownerId || record.coveragePercent > grid.ownerCoverage) {
//             const previousOwner = grid.ownerId;

//             grid.ownerId = userId;
//             grid.ownerCoverage = record.coveragePercent;
//             grid.lastCapturedAt = new Date();

//             await grid.save();

//             // ✅ Update user stats
//             await User.findByIdAndUpdate(userId, {
//                 $inc: { totalAreaCaptured: 22500 },
//             });

//             // Remove from previous owner
//             if (previousOwner && previousOwner.toString() !== userId.toString()) {
//                 await User.findByIdAndUpdate(previousOwner, {
//                     $inc: { totalAreaCaptured: -22500 },
//                 });
//             }
//         }
//     }

//     return record;
// };

// module.exports = { updateCoverage };


/*
==========================================
==file DB change to test the app for now==
==========================================
*/

const { readData, writeData } = require("../utils/fileDB");
const {
    MAX_DISTANCE_FOR_FULL_COVERAGE,
    CAPTURE_THRESHOLD,
} = require("../utils/constants");

const updateCoverage = async (userId, geohash, distance) => {
    let coverage = readData("coverage.json");
    let grids = readData("grids.json");

    let record = coverage.find(
        (c) => c.userId === userId && c.geohash === geohash
    );

    if (!record) {
        record = {
            userId,
            geohash,
            distanceCovered: 0,
            coveragePercent: 0,
        };
        coverage.push(record);
    }

    record.distanceCovered += distance;
    record.coveragePercent = Math.min(
        record.distanceCovered / MAX_DISTANCE_FOR_FULL_COVERAGE,
        1
    );

    // Capture logic
    if (record.coveragePercent >= CAPTURE_THRESHOLD) {
        let grid = grids.find((g) => g.geohash === geohash);

        if (!grid) {
            grid = {
                geohash,
                ownerId: null,
                ownerCoverage: 0,
            };
            grids.push(grid);
        }

        if (!grid.ownerId || record.coveragePercent > grid.ownerCoverage) {
            grid.ownerId = userId;
            grid.ownerCoverage = record.coveragePercent;
            grid.lastCapturedAt = new Date();
        }
    }

    console.log(
        `🔥 Grid Captured: ${geohash} by User ${userId} | Coverage: ${record.coveragePercent}`
    );
    writeData("coverage.json", coverage);
    writeData("grids.json", grids);

    return record;
};

// console.log(
//     `🔥 Grid Captured: ${geohash} by User ${userId} | Coverage: ${record.coveragePercent}`
// );

module.exports = { updateCoverage };