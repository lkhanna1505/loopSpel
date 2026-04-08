// const UserGridCoverage = require("../models/UserGridCoverage");

// const getMyTerritories = async (req, res) => {
//     try {
//         const userId = req.user;

//         const grids = await UserGridCoverage.find({ userId });

//         const totalArea = grids.length * 22500; // approx grid area

//         res.json({
//             totalArea,
//             grids,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// 
// module.exports = { getMyTerritories };

/*
==========================================
==file DB change to test the app for now==
==========================================
*/

const { readData } = require("../utils/fileDB");

const getMyTerritories = (req, res) => {
    const userId = req.user;

    const coverage = readData("coverage.json");

    const myGrids = coverage.filter((c) => c.userId === userId);

    res.json({
        totalGrids: myGrids.length,
        grids: myGrids,
    });
};

module.exports = { getMyTerritories };