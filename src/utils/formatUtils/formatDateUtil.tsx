
import moment from 'moment';

/**
 * Parses a number value into a Date object.
 *
 * @param {number} value - The number value to be parsed into a Date object
 * @return {Date} The Date object parsed from the input number value, or null if the input is null or undefined
 */
export function parseDate(value: number) {

    if (value == null || value == undefined)
        return null;

    return new Date(value);
}

/**
 * Formats the given value into a specific date format.
 *
 * @param {number | string} value - The value to be formatted as a date.
 * @param {string} format - The format in which the date should be displayed.
 * @return {string} The formatted date according to the specified format.
 */
export function formatDate(value: number | string, format: string) {
    
    if (value == undefined || value == null)
        return "";

    let newDate = moment(Number(value));
    let newDateFormated;

    try {

        if (!newDate.isValid())
            throw new Error("Date invalid");

        newDateFormated = newDate.format(format);
    }
    catch(error) {
        return "!ErrorFormat (" + value + ")";
    }

    return newDateFormated;

}