// const Grid = require("../models/Grid");

// const getViewportGrids = async (req, res) => {
//     try {
//         // For MVP: return latest 100 grids
//         const grids = await Grid.find().limit(100);

//         res.json(grids);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = { getViewportGrids };


/*
==========================================
==file DB change to test the app for now==
==========================================
*/

const { readData } = require("../utils/fileDB");

const getViewportGrids = (req, res) => {
    const grids = readData("grids.json");

    res.json(grids.slice(0, 100));
};

module.exports = { getViewportGrids };