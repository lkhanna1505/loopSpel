const geohash = require("ngeohash");
const { GEOHASH_PRECISION } = require("../utils/constants");

const getGeohash = (lat, lng) => {
    return geohash.encode(lat, lng, GEOHASH_PRECISION);
};

module.exports = { getGeohash };