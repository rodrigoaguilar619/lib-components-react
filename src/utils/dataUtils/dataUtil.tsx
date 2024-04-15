import moment from "moment";

/**
 * Performs a deep clone of the input object using JSON parsing and stringification.
 *
 * @param {any} obj - the object to be deep cloned
 * @return {any} the deep cloned object
 */
export const deepClone = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if the provided data has a value.
 *
 * @param {any} data - the data to be checked
 * @return {boolean} true if the data has a value, false otherwise
 */
export function dataWithValue(data: any) {
    return (data !== undefined && data !== null && data !== "");
}

/**
 * Compares two dates without considering the time part.
 *
 * @param {Date} date1 - The first date to compare
 * @param {Date} date2 - The second date to compare
 * @return {boolean} True if the dates have the same day, month, and year; false otherwise
 */
export function compareDatesWithoutTime(date1: Date, date2: Date): boolean {
    return moment(date1).isSame(date2, 'day') && moment(date1).isSame(date2, 'month') && moment(date1).isSame(date2, 'year');
}