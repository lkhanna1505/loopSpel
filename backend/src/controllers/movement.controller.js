const { calculateDistance } = require("../services/distance.service");
const { getGeohash } = require("../services/geohash.service");
const { updateCoverage } = require("../services/coverage.service");
const { MIN_DISTANCE_METERS, MAX_DISTANCE_PER_POINT } = require("../utils/constants");

const lastPoints = new Map(); // temp memory (later Redis)

const processBatch = async (req, res) => {
    try {
        const userId = req.user;
        const { points } = req.body;

        if (!points || points.length === 0) {
            return res.status(400).json({ message: "No points provided" });
        }

        let totalProcessed = 0;

        for (let point of points) {
            const { lat, lng } = point;

            const prev = lastPoints.get(userId);

            if (!prev) {
                lastPoints.set(userId, point);
                continue;
            }

            const distance = calculateDistance(
                prev.lat,
                prev.lng,
                lat,
                lng
            );

            if (
                distance < MIN_DISTANCE_METERS ||
                distance > MAX_DISTANCE_PER_POINT
            ) {
                continue;
            }

            const geohash = getGeohash(lat, lng);

            await updateCoverage(userId, geohash, distance);

            lastPoints.set(userId, point);
            totalProcessed++;
        }

        res.json({
            processedPoints: totalProcessed,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Prev:", prev);
        console.log("Curr:", point);
        console.log("Distance:", distance);
        console.log("➡️ Processing Point:", point);
        console.log("📏 Distance:", distance);
        console.log("🧭 Geohash:", geohash);
    }
};

module.exports = { processBatch };