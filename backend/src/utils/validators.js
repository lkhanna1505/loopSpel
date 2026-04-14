const isValidLatLng = (lat, lng) => {
    return (
        typeof lat === "number" &&
        typeof lng === "number" &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
    );
};

const validatePoints = (points) => {
    if (!Array.isArray(points) || points.length === 0) return false;

    for (let p of points) {
        if (!isValidLatLng(p.lat, p.lng)) return false;
    }

    return true;
};

module.exports = {
    isValidLatLng,
    validatePoints,
};