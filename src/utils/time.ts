import { DateTime } from 'luxon';

/**
 * @description Time Util
 * @author Jonas Lim
 */

// KST (Seoul, Korea)
function getKSTTime(): string | null {
    return DateTime.now().setZone('Asia/Seoul').toISO();
}

// PST (Los Angeles, Vancouver)
function getPSTTime(): string | null {
    return DateTime.now().setZone('America/Los_Angeles').toISO();
}

// UTC
function getUTCDate(): string | null {
    return DateTime.utc().toISO();
}

export {
    getKSTTime,
    getPSTTime,
    getUTCDate
};
