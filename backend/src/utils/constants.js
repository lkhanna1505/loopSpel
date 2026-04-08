/*
MAX_SPEED = 15 // km / h
GPS_INTERVAL = 5 // sec
MIN_DISTANCE_FILTER = 5 // meters
MAX_ACCURACY_ALLOWED = 50 // meters
GRID_CAPTURE_THRESHOLD = 0.5 // 50%
*/

module.exports = {
    MAX_SPEED_KMH: 15,
    MIN_DISTANCE_METERS: 5,
    GEOHASH_PRECISION: 7,
    MAX_DISTANCE_PER_POINT: 100, // anti-jump

    // Coverage logic
    MAX_DISTANCE_FOR_FULL_COVERAGE: 600, // meters
    CAPTURE_THRESHOLD: 0.5,
};