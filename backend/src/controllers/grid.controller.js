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
const geohash = require("ngeohash");

const getViewportGrids = (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ message: "lat/lng required" });
    }

    const centerHash = geohash.encode(Number(lat), Number(lng), 5);

    const grids = readData("grids.json");

    const nearby = grids.filter((g) =>
        g.geohash.startsWith(centerHash.slice(0, 4))
    );

    res.json(nearby);
};

module.exports = { getViewportGrids };