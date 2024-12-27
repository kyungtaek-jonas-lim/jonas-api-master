const { DateTime } = require('luxon');

// KST (Seoul, Korea)
function getKSTTime() {
    return DateTime.now().setZone('Asia/Seoul').toISO();
}

// PST (Los Angeles, Vancouver)
function getPSTTime() {
    return DateTime.now().setZone('America/Los_Angeles').toISO();
}

// UTC
function getUTCDate() {
    return DateTime.utc().toISO();
}

module.exports = {
    getKSTTime,
    getPSTTime,
    getUTCDate
};
